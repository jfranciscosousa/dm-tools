import { OpenAI } from "openai";
import { OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";
import { z } from "zod";
import { OPENAI_KEY } from "$env/static/private";

const openai = new OpenAI({ apiKey: OPENAI_KEY });
const llmApi = new OpenAIChatApi({ apiKey: OPENAI_KEY }, { model: "gpt-3.5-turbo-16k" });
const npcSchema = z.object({
  name: z.string().describe("Character name"),
  alignment: z.string().describe("Alignment"),
  race: z.string().describe("Race"),
  class: z.string().describe("Class"),
  subclass: z.string().describe("Subclass"),
  background: z.string().describe("Background"),
  backgroundLong: z.string().describe("A small paragraph describing this character story so far"),
  appearance: z.string().describe("A small paragraph describing this character's looks"),
  personalityTraits: z.string().describe("Personality traits"),
  ideals: z.string().describe("Ideals"),
  bonds: z.string().describe("Bonds"),
  flaws: z.string().describe("Flaws"),
  roleplayingTips: z
    .string()
    .describe("Tips to roleplay this character. Maneirisms, manner of speech, etc")
});

export type Npc = z.infer<typeof npcSchema> & { imageUrl: string };

export async function generateNpc(prompt?: string): Promise<Npc> {
  const response = await completion(
    llmApi,
    `Generate a character concept for a DnD 5th edition game. Use these keywords to generate something: ${prompt}`,
    {
      schema: npcSchema
    }
  );
  const imageResponse = await openai.images.generate({
    model: "dall-e-3",
    prompt: `Generate a fantasty portrait for a 5th edition game using a Midjourney art-style following these this: ${response.data.appearance}. Try to make the portraits full body and add a background to the image that matches the character's story background: ${response.data.background}`,
    n: 1,
    size: "1024x1024"
  });

  return {
    ...response.data,
    imageUrl: imageResponse.data[0].url!
  };
}
