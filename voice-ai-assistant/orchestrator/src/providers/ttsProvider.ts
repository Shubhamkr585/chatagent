export type TtsResult = {
  audioBase64: string;
};

export class TtsProvider {
  async speak(text: string): Promise<TtsResult> {
    console.log(`TTS placeholder invoked with: ${text}`);
    return {
      audioBase64: "",
    };
  }
}
