import { zodToJsonSchema } from "zod-to-json-schema";
import z from "zod";
import { generateObject, generateText } from "ai";
import { gateway } from "@vercel/ai-sdk-gateway";

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

  return object;
}

export async function generateMarkdown<T extends z.ZodRawShape>(
  prompt: string,
  schema: z.ZodObject<T>,
  { model = "openai/gpt-4o", temperature }: GenerateDataOptions = {}
): Promise<string> {
  const jsonSchema = JSON.stringify(zodToJsonSchema(schema, "schema"));
  const fullPrompt = `
    ${prompt}

    Please respond following the specified json schema below but format the data into a beautiful markdown page.
    You can use the json schema as the data source for the markdown document. You don't need to exactly replicate the schema
    into markdown. You just use it as the source of data but then build the document as best you can for easy
    human readability.

    Do not wrap the output with \`\`\`markdown please. Avoid using h1 and h2 and use only h3.

    ${jsonSchema}
  `;
  const { text } = await generateText({
    model: gateway(model),
    prompt: fullPrompt,
    temperature
  });

  return text;
}
