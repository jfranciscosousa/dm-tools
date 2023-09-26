import { OpenAIChatApi } from "llm-api";
import { completion } from "zod-gpt";
import { z } from "zod";
import { OPENAI_KEY } from "$env/static/private";

const openai = new OpenAIChatApi({ apiKey: OPENAI_KEY }, { model: "gpt-3.5-turbo-16k" });

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

export type Npc = z.infer<typeof npcSchema>;

export async function generateNpc(prompt?: string): Promise<Npc> {
  const response = await completion(
    openai,
    `Generate a character concept for a DnD 5th edition game. Use these keywords to generate something: ${prompt}`,
    {
      schema: npcSchema
    }
  );

  return response.data;
}
