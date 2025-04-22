import { ChatOpenAI } from "@langchain/openai";
import { ChatGroq } from "@langchain/groq";

const openaiModels = ["gpt-4.1-nano", "gpt-4.1-mini", "gpt-4.1"] as const;
type OpenAIModel = (typeof openaiModels)[number];

const groqModels = [
  "gemma2-9b-it",
  "llama-3.1-8b-instant",
  "llama-3.3-70b-versatile",
  "meta-llama/llama-4-maverick-17b-128e-instruct",
  "meta-llama/llama-4-scout-17b-16e-instruct",
  "mistral-saba-24b",
  "qwen-qwq-32b",
] as const;
type GroqModel = (typeof groqModels)[number];

export const openai = (config: {
  model?: OpenAIModel;
  temperature?: number;
  max_tokens?: number;
}) => {
  return new ChatOpenAI({
    apiKey: useEnv().OPENAI_API_KEY,
    model: config.model || ("gpt-4.1-nano" as OpenAIModel),
    temperature: config.temperature,
    maxTokens: config.max_tokens,
    configuration: { baseURL: `${useEnv().CF_GATEWAY_URL}/openai` },
  });
};

export const groq = (config: {
  model?: OpenAIModel;
  temperature?: number;
  max_tokens?: number;
}) => {
  return new ChatGroq({
    apiKey: useEnv().GROQ_API_KEY,
    model: config.model || ("gemma2-9b-it" as GroqModel),
    temperature: config.temperature,
    maxTokens: config.max_tokens,
    baseUrl: `${useEnv().CF_GATEWAY_URL}/groq`,
  });
};
