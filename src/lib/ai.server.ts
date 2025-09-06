import { generateObject, generateText } from "ai";
import { gateway } from "@ai-sdk/gateway";
import { z } from "zod";

type GenerateDataOptions = {
  model?: Parameters<typeof gateway>[0];
  temperature?: number;
};

export async function generateData<T extends z.ZodRawShape>(
  prompt: string,
  schema: z.ZodObject<T>,
  { model = "openai/gpt-4.1", temperature }: GenerateDataOptions = {}
): Promise<z.infer<z.ZodObject<T>>> {
  const { object } = await generateObject({
    model: gateway(model),
    schema,
    prompt,
    temperature
  });

  return object as z.infer<z.ZodObject<T>>;
}

export async function generateMarkdown(
  prompt: string,
  markdownTemplate: string,
  { model = "openai/gpt-5-nano", temperature }: GenerateDataOptions = {}
): Promise<string> {
  const { text } = await generateText({
    model: gateway(model),
    prompt,
    system: `You are a markdown generator. You will receive a markdown prompt with <PLACEHOLDER:the_description> tags all over. Your job is to replace these tags and keep the original formatting and return it as is. You will also receive a prompt with overall instructions for the document. Do not include extra information and only use the placeholder. Here is the template: ${markdownTemplate}`,
    temperature
  });

  return text;
}
