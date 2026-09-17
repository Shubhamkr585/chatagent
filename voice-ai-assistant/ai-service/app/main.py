from fastapi import FastAPI

app = FastAPI(title="Voice AI Python Service", version="0.1.0")


@app.get("/health")
def health() -> dict:
    return {"ok": True, "service": "voice-ai-python-service", "status": "healthy"}


@app.get("/")
def root() -> dict:
    return {"service": "voice-ai-python-service", "status": "running"}


@app.post("/transcribe")
def transcribe() -> dict:
    return {"status": "accepted", "message": "Transcription microservice placeholder is ready."}


@app.post("/generate")
def generate() -> dict:
    return {"status": "accepted", "message": "LLM generation microservice placeholder is ready."}
