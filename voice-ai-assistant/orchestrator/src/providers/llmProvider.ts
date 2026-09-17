export type LlmMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type LlmResponse = {
  text: string;
};

export class LlmProvider {
  async chat(_messages: LlmMessage[]): Promise<LlmResponse> {
    return {
      text: "I am the LLM placeholder. Connect your model provider to continue.",
    };
  }
}
