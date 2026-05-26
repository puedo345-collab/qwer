import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Standard port is strictly 3000
const PORT = 3000;
const DB_FILE_PATH = path.join(process.cwd(), "submissions.json");
const ADMIN_CONFIG_PATH = path.join(process.cwd(), "admin_config.json");

interface Submission {
  id: string;
  name: string;
  phone: string;
  occupation: string;
  debtAmount: string;
  monthlyIncome?: string;
  dependentsCount?: string;
  hasMoreDebtThanAssets: string;
  region: string;
  difficulties: string[];
  ageGroup: string;
  status: "신청완료" | "상담중" | "서류요청" | "접수완료" | "완료" | "기각";
  counselorNotes: string;
  createdAt: string;
  updatedAt: string;
  isSimpleConsultation?: boolean;
}

// Ensure database file exists
function initDatabase() {
  if (!fs.existsSync(DB_FILE_PATH)) {
    const seedSubmissions: Submission[] = [
      {
        id: "sub_1",
        name: "김민재",
        phone: "010-8234-9004",
        occupation: "regular_employee",
        debtAmount: "50m_100m",
        monthlyIncome: "200_300",
        dependentsCount: "2",
        hasMoreDebtThanAssets: "yes",
        region: "seoul_metropolitan",
        difficulties: ["high_interest", "living_cost"],
        ageGroup: "30대",
        status: "상담중",
        counselorNotes: "3천만원 추가 이자 부담으로 가용 소득의 부족을 호소함. 2026 최저생계비 기준 적용하여 월 120만원 수준 조정 및 최근 대출 소명안 논의 중.",
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
        updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
      },
      {
        id: "sub_2",
        name: "이지영",
        phone: "010-3345-7182",
        occupation: "business_owner",
        debtAmount: "over_100m",
        monthlyIncome: "300_400",
        dependentsCount: "3",
        hasMoreDebtThanAssets: "yes",
        region: "seoul_metropolitan",
        difficulties: ["debt_repayment", "guarantee"],
        ageGroup: "40대",
        status: "신청완료",
        counselorNotes: "",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
        updatedAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: "sub_3",
        name: "최성우",
        phone: "010-5561-1209",
        occupation: "freelancer_parttime",
        debtAmount: "30m_50m",
        monthlyIncome: "150_200",
        dependentsCount: "1",
        hasMoreDebtThanAssets: "yes",
        region: "other_regions",
        difficulties: ["living_cost"],
        ageGroup: "20대",
        status: "접수완료",
        counselorNotes: "단독 거주 최저생계비 소득 보충 소명서 첨부 예정. 성실 상환 의사 매우 높음.",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
        updatedAt: new Date(Date.now() - 3600000 * 10).toISOString()
      }
    ];
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(seedSubmissions, null, 2), "utf-8");
  }
}

initDatabase();

// Read from JSON DB
function readSubmissions(): Submission[] {
  try {
    const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
}

// Write to JSON DB
function writeSubmissions(data: Submission[]) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to database:", error);
  }
}

async function startServer() {
  const app = express();

  // Parse JSON payloads
  app.use(express.json());

  // Check admin password (supports dynamic file override or environment variable setup)
  const getAdminPassword = () => {
    try {
      if (fs.existsSync(ADMIN_CONFIG_PATH)) {
        const configData = JSON.parse(fs.readFileSync(ADMIN_CONFIG_PATH, "utf-8"));
        if (configData && configData.adminPassword) {
          return String(configData.adminPassword);
        }
      }
    } catch (err) {
      console.error("[getAdminPassword] Error reading admin config:", err);
    }
    return process.env.ADMIN_PASSWORD || "1234";
  };

  // API: Get App configuration info
  app.get("/api/config", (req, res) => {
    res.json({
      hasAdminPasswordConfigured: true,
    });
  });

  // API: Auth / Verification
  app.post("/api/admin/verify", (req, res) => {
    const { password } = req.body;
    if (String(password) === getAdminPassword()) {
      res.json({ success: true, token: Buffer.from(getAdminPassword()).toString("base64") });
    } else {
      res.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
    }
  });

  // Helper middleware to verify token (basic Base64 authorization match)
  const verifyAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ error: "권한이 없습니다. 로그인이 필요합니다." });
      return;
    }

    const token = authHeader.replace("Bearer ", "");
    try {
      const decoded = Buffer.from(token, "base64").toString("utf-8");
      if (decoded === getAdminPassword()) {
        next();
      } else {
        res.status(403).json({ error: "세션이 만료되었거나 권한이 맞지 않습니다." });
      }
    } catch {
      res.status(400).json({ error: "유효하지 않은 보안 토큰 방식입니다." });
    }
  };

  // API: Change admin password (Protected)
  app.post("/api/admin/change-password", verifyAdmin, (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword || typeof newPassword !== "string" || newPassword.trim().length < 4) {
      res.status(400).json({ error: "새 비밀번호는 최소 4자 이상이어야 합니다." });
      return;
    }

    try {
      const configObj = { adminPassword: newPassword.trim() };
      fs.writeFileSync(ADMIN_CONFIG_PATH, JSON.stringify(configObj, null, 2), "utf-8");
      res.json({ success: true, message: "비밀번호가 안전하게 변경되었습니다. 다시 로그인 하십시오." });
    } catch (err) {
      console.error("[ChangePassword] Error storing new password configuration:", err);
      res.status(500).json({ error: "서버 설정 보관 도중 오류가 발생했습니다." });
    }
  });

  // API: Insert new Submission
  app.post("/api/submissions", (req, res) => {
    const body = req.body;
    if (!body.name || !body.phone) {
      res.status(400).json({ error: "이름과 연락처는 필수 입력항목입니다." });
      return;
    }

    const list = readSubmissions();
    const newId = "sub_" + Math.random().toString(36).substr(2, 9);
    const isSimple = !!body.isSimpleConsultation;

    const newSubmission: Submission = {
      id: newId,
      name: body.name,
      phone: body.phone,
      occupation: isSimple ? "" : (body.occupation || "regular_employee"),
      debtAmount: isSimple ? "" : (body.debtAmount || "30m_50m"),
      monthlyIncome: isSimple ? undefined : body.monthlyIncome,
      dependentsCount: isSimple ? undefined : body.dependentsCount,
      hasMoreDebtThanAssets: isSimple ? "" : (body.hasMoreDebtThanAssets || "yes"),
      region: isSimple ? "" : (body.region || "seoul_metropolitan"),
      difficulties: body.difficulties || [],
      ageGroup: isSimple ? "" : (body.ageGroup || "30대"),
      status: "신청완료",
      counselorNotes: body.counselorNotes || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isSimpleConsultation: isSimple
    };

    list.unshift(newSubmission); // prepend so newest is first
    writeSubmissions(list);

    res.status(201).json({ success: true, submissionId: newId });
  });

  // API: Get List of Submissions (Protected)
  app.get("/api/submissions", verifyAdmin, (req, res) => {
    const list = readSubmissions();
    res.json(list);
  });

  // API: Update Submission Notes/Status (Protected)
  app.patch("/api/submissions/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const { status, counselorNotes } = req.body;

    const list = readSubmissions();
    const index = list.findIndex(sub => sub.id === id);

    if (index === -1) {
      res.status(404).json({ error: "해당 제출물 정보를 찾을 수 없습니다." });
      return;
    }

    const updated = {
      ...list[index],
      ...(status !== undefined && { status }),
      ...(counselorNotes !== undefined && { counselorNotes }),
      updatedAt: new Date().toISOString()
    };

    list[index] = updated;
    writeSubmissions(list);

    res.json({ success: true, data: updated });
  });

  // API: Delete Submission (Protected)
  app.delete("/api/submissions/:id", verifyAdmin, (req, res) => {
    const { id } = req.params;
    const list = readSubmissions();
    const filtered = list.filter(sub => sub.id !== id);

    if (list.length === filtered.length) {
      res.status(404).json({ error: "해당 제출물 정보를 찾을 수 없습니다." });
      return;
    }

    writeSubmissions(filtered);
    res.json({ success: true, message: "접수 내역이 안전하게 영구 삭제되었습니다." });
  });

  // Use Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Real-time Full-Stack Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
