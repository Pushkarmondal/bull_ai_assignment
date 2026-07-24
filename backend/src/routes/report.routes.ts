import { Router } from "express";
import { uploadMiddleware } from "../middlewares/upload";
import { generateReportController, downloadReportController } from "../controllers/report.controller";

const router = Router();

router.post("/api/report/generate", uploadMiddleware.single("file"), generateReportController);
router.get("/reports/:filename", downloadReportController);

export default router;
