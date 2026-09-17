import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.status(200).json({
    ok: true,
    service: "voice-ai-orchestrator",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});
