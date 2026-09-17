# Voice AI Assistant

A starter monorepo for a real-time voice AI assistant built around a Node.js orchestrator and an optional Python FastAPI microservice.

## Product vision

A caller can connect through a browser or telephony channel and talk to an AI agent that handles FAQs, appointment booking, and simple support tasks in real time using speech-to-text, LLM reasoning, and text-to-speech.

## Architecture summary

- Node.js orchestrator handles WebSocket sessions, live audio streaming, business orchestration, and system coordination.
- Redis provides low-latency session and cache state.
- Postgres stores transcripts, logs, and call metadata.
- FastAPI is optional for Python-specific AI operations such as local Whisper or custom LLM logic.
- Docker packages each service for deployment consistency.
- GitHub Actions handles CI and deployment to a free hosting platform.

## Repository structure

```text
voice-ai-assistant/
├── orchestrator/
│   ├── src/
│   ├── test/
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
├── ai-service/
│   ├── app/
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env.example
├── infra/
│   ├── docker-compose.yml
│   └── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   └── architecture.md
├── .gitignore
├── README.md
└── LICENSE (optional)
```

## SDE lifecycle

### 1. Requirements gathering

The system must support:

- low-latency bidirectional voice communication
- secure session tracking for concurrent users
- STT conversion from incoming audio
- LLM-based intent extraction and response generation
- TTS playback of agent responses
- persistent logging to a database
- optional Python AI microservice for custom model workloads
- free-tier deployment with Docker-based hosting

### 2. System design

The orchestration layer is responsible for session management and runtime coordination. The FastAPI service is optional and acts as a plugin-like inference layer. Redis keeps ephemeral session data and audio context warm, while Postgres stores durable records.

### 3. Detailed design

- WebSocket endpoint accepts audio streams and control messages.
- Session manager allocates per-caller session state.
- Audio handler buffers chunks and forwards them to STT.
- STT provider wraps a speech API or model.
- LLM provider chooses intent, action, and response.
- TTS provider converts final text into audio.
- DB adapters store transcripts and action records.

### 4. Implementation plan

1. Create the Node orchestrator skeleton and health route.
2. Add WebSocket session lifecycle and basic message handling.
3. Add Redis and Postgres adapters.
4. Add provider wrappers for STT / LLM / TTS.
5. Add FastAPI optional service for custom Python AI work.
6. Add Docker compose setup for local development.
7. Add CI and deployment workflows.
8. Validate build and startup flows.

### 5. Testing strategy

- unit tests for provider adapters and session state
- integration tests for WebSocket handshakes and message routing
- smoke tests for FastAPI health and transcribe endpoints
- build validation in CI

### 6. Deployment strategy

- local: Docker Compose
- staging: deploy to free-tier hosting like Render or Railway
- production: use managed Redis and Postgres providers with environment-based config

## Local development

```bash
cd voice-ai-assistant/infra
docker compose up --build
```

Then open:

- orchestrator: http://localhost:3000/health
- ai-service: http://localhost:8000/health

## Environment variables

Create a local `.env` file in both service folders or use `infra/.env.example` as a template.

Example:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
POSTGRES_URL=postgresql://postgres:postgres@localhost:5432/voice_ai
OPENAI_API_KEY=your_key
ELEVENLABS_API_KEY=your_key
```

## Notes

This repo is intentionally structured as a starter project. It is designed to be extended with real telephony integrations, appointment logic, and external provider credentials as the product matures.

## Next steps

- add authentication and session security
- wire up real STT/LLM/TTS provider calls
- implement appointment booking logic in Postgres
- add call logging and analytics dashboards
- add a production deployment target and secret management
