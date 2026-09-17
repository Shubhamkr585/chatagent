import os
from dotenv import load_dotenv

load_dotenv()

APP_PORT = int(os.getenv("APP_PORT", "8000"))
MODEL_NAME = os.getenv("MODEL_NAME", "local-whisper")
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
