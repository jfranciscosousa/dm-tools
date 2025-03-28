import { OpenAI } from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { env } from "$env/dynamic/private";
import z from "zod";

export async function generateImage(prompt: string) {
  const openai = new OpenAI({ apiKey: env.OPENAI_KEY });
  const imageResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024"
  });

  return imageResponse.data[0].url;
}

type GenerateDataOptions = {
  model?: OpenAI.Chat.ChatCompletionCreateParams["model"];
};

export async function generateData<T extends z.ZodRawShape>(
  prompt: string,
  schema: z.ZodObject<T>,
  { model = "gpt-4o" }: GenerateDataOptions = {}
): Promise<z.infer<z.ZodObject<T>>> {
  const openai = new OpenAI({ apiKey: env.OPENAI_KEY });
  const jsonSchema = JSON.stringify(zodToJsonSchema(schema, "schema"));
  const fullPrompt = `
    ${prompt}

    Please respond following the specified json schema below. Always respect it at all times. Strictly adhere to it's parameters.

    ${jsonSchema}
  `;
  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: fullPrompt }],
    response_format: { type: "json_object" }
  });
  const response = completion.choices[0].message;

  return schema.parse(JSON.parse(response.content as string));
}

export async function generateMarkdown<T extends z.ZodRawShape>(
  prompt: string,
  schema: z.ZodObject<T>,
  { model = "gpt-4o" }: GenerateDataOptions = {}
): Promise<string> {
  const openai = new OpenAI({ apiKey: env.OPENAI_KEY });
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
  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "user", content: fullPrompt }],
    response_format: { type: "text" }
  });
  const response = completion.choices[0].message;

  return response.content as string;
}
