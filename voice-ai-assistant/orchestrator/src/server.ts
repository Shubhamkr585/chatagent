import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

import { config } from "./config";
import { healthRouter } from "./routes/health";

type SessionState = {
  sessionId: string;
  createdAt: string;
  status: "connected" | "active" | "ended";
  userId?: string;
};

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

app.use(express.json());
app.use("/health", healthRouter);

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "voice-ai-assistant-orchestrator",
    status: "running",
    port: config.port,
  });
});

wss.on("connection", (socket) => {
  const sessionId = uuidv4();
  const session: SessionState = {
    sessionId,
    createdAt: new Date().toISOString(),
    status: "connected",
  };

  socket.send(
    JSON.stringify({
      type: "session",
      sessionId,
      status: session.status,
      createdAt: session.createdAt,
    }),
  );

  socket.on("message", (rawMessage) => {
    const payload = rawMessage.toString();

    try {
      const parsed = JSON.parse(payload) as { type?: string; transcript?: string };

      if (parsed.type === "audio_chunk") {
        socket.send(
          JSON.stringify({
            type: "ack",
            sessionId,
            received: true,
            size: payload.length,
          }),
        );
        return;
      }

      socket.send(
        JSON.stringify({
          type: "assistant",
          sessionId,
          transcript: parsed.transcript ?? "Listening...",
          response: "Hello! I am the voice assistant orchestrator. The STT/LLM/TTS pipeline is ready to be connected.",
        }),
      );
    } catch (error) {
      socket.send(
        JSON.stringify({
          type: "error",
          message: "Invalid JSON payload",
          cause: error instanceof Error ? error.message : "unknown",
        }),
      );
    }
  });
});

server.listen(config.port, () => {
  console.log(`Voice AI orchestrator listening on http://localhost:${config.port}`);
});
