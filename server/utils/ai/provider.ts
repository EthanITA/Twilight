export const openai = (config: {
  model: string;
  temperature: number;
  max_tokens: number;
}) => {
  return {
    invoke: async (messages: any) => {},
  };
};
