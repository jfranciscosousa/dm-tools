import { OpenAI } from "openai";
import { zodToJsonSchema } from "zod-to-json-schema";
import { OPENAI_KEY } from "$env/static/private";
import z from "zod";

const openai = new OpenAI({ apiKey: OPENAI_KEY });

export async function generateImage(prompt: string) {
  const imageResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024"
  });

  return imageResponse.data[0].url;
}

export async function generateData<T extends z.ZodRawShape>(
  prompt: string,
  schema: z.ZodObject<T>
): Promise<z.infer<z.ZodObject<T>>> {
  const jsonSchema = JSON.stringify(zodToJsonSchema(schema, "schema"));
  const fullPrompt = `
    ${prompt}

    Please respond following the specified json schema below. Always respect it at all times. Strictly adhere to it's parameters.
    Do not add any markdown formatting around the JSON. Just answer with the text.

    ${jsonSchema}
  `;
  const completion = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [{ role: "user", content: fullPrompt }]
  });
  const response = completion.choices[0].message;

  return schema.parse(JSON.parse(response.content as string));
}
