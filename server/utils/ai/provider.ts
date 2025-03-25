import { ChatOpenAI } from "@langchain/openai";

// TODO use qwen1.5-7b-chat-awq of CF
export const openai = (config: {
  model: string;
  temperature: number;
  max_tokens: number;
}) => {
  return new ChatOpenAI({
    apiKey: useEnv().OPENAI_API_KEY,
    model: config.model,
    temperature: config.temperature,
    maxTokens: config.max_tokens,
    configuration: {
      baseURL: `${useEnv().CF_GATEWAY_URL}/openai`,
      defaultHeaders: {
        "cf-aig-authorization": useEnv().CF_GATEWAY_API_KEY,
      },
    },
  });
};
