import { generateText, Output, zodSchema } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { z } from "zod";

type GenerateDataOptions = {
  model?: Parameters<typeof gateway>[0];
  temperature?: number;
};

export async function generateStructured<T>(
  prompt: string,
  schema: z.ZodType<T>,
  { model = "openai/gpt-5.4", temperature }: GenerateDataOptions = {}
): Promise<T> {
  const result = await generateText({
    model: gateway(model),
    output: Output.object({ schema: zodSchema(schema) }),
    prompt,
    temperature
  });

  return result.output as T;
}
