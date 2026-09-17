# Architecture Overview

## 1. Goals

The system is intended to support voice-first contact center interactions where a user speaks to an AI assistant instead of a human representative.

Core goals:

- low latency voice interactions
- session-aware conversation handling
- external AI provider integration
- durable logs and transcripts
- simple deployment with free-tier services

## 2. Functional flow

1. Client opens a WebSocket connection.
2. Node orchestrator creates a session.
3. Incoming audio is buffered and streamed to STT.
4. The raw transcript is sent to the LLM.
5. The LLM decides the intent and form of the response.
6. The response text is sent to TTS.
7. Audio is streamed back to the client.
8. Redis retains session context and cache entries.
9. Postgres stores transcripts and action records.

## 3. Service boundaries

### Orchestrator

Responsibilities:

- WebSocket management
- per-session state
- provider orchestration
- API health endpoints
- business workflow coordination

### AI service

Responsibilities:

- optional Python-specific inference work
- local Whisper or custom logic
- model-specific processing isolated from the Node runtime

### Data services

- Redis: ephemeral state, temporary context, pub-sub, task queue
- Postgres: durable records, analytics data, appointment metadata

## 4. Sequence diagram

```text
Client -> Orchestrator: WebSocket connect
Orchestrator -> Redis: Create session state
Client -> Orchestrator: Audio chunk
Orchestrator -> STT Provider: send audio
STT Provider -> Orchestrator: transcript text
Orchestrator -> LLM Provider: transcript + context
LLM Provider -> Orchestrator: response text
Orchestrator -> TTS Provider: response text
TTS Provider -> Orchestrator: audio stream
Orchestrator -> Client: spoken audio response
Orchestrator -> Postgres: save transcript/log
```

## 5. Non-functional requirements

- response time under a few seconds for simple flows
- graceful degradation when external providers fail
- session isolation per caller
- secure handling of secrets and API keys
- containerized deployment for portability

## 6. Deployment topology

- orchestrator container
- ai-service container
- Redis service
- Postgres service
- CI pipeline for test/build
- deployment pipeline for free-tier hosting

## 7. Risks and mitigations

- provider latency: use streaming and caching
- session loss: persist state in Redis and recover on reconnect
- cost spikes: enforce rate limits and provider quotas
- deployment drift: use Docker and CI automation

## 8. Suggested next steps

1. implement actual provider adapters
2. add real appointment booking workflow
3. add telemetry and structured logging
4. secure and rotate secrets properly
5. add end-to-end smoke tests
