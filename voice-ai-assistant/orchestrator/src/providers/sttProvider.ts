export type SttResult = {
  transcript: string;
  confidence?: number;
};

export class SttProvider {
  async transcribe(_audioBuffer: Buffer): Promise<SttResult> {
    return {
      transcript: "Transcription placeholder",
      confidence: 0.95,
    };
  }
}
