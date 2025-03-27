import { generateMarkdown } from "$lib/openai";
import { z } from "zod";
import showdown from "showdown";
import sanitizeHtml from "sanitize-html";

const npcSchema = z.object({
  name: z.string().describe("Character name"),
  alignment: z.string().describe("Alignment"),
  race: z.string().describe("Race"),
  class: z.string().describe("Class"),
  subclass: z.string().describe("Subclass"),
  stats: z
    .object({
      strenght: z.number().min(1).max(30),
      dexterity: z.number().min(1).max(30),
      constitution: z.number().min(1).max(30),
      intelligence: z.number().min(1).max(30),
      wisdom: z.number().min(1).max(30),
      charims: z.number().min(1).max(30)
    })
    .describe("5th edition stats"),
  background: z.string().describe("Background"),
  backgroundLong: z.string().describe("A small paragraph describing this character story so far"),
  appearance: z
    .string()
    .describe(
      "A small paragraph describing this character's looks. This will be submitted to DALL-E later, please be thorough on the description."
    ),
  personalityTraits: z.array(z.string()).describe("Personality traits"),
  ideals: z.array(z.string().describe("Long description")).describe("Ideals"),
  bonds: z.array(z.string().describe("Long description")).describe("Bonds"),
  flaws: z.array(z.string().describe("Long description")).describe("Flaws"),
  roleplayingTips: z
    .string()
    .describe("Tips to roleplay this character. Maneirisms, manner of speech, etc")
});

export type Npc = z.infer<typeof npcSchema> & { imageUrl?: string };

export async function generateNpc(prompt?: string): Promise<string> {
  const markdown = await generateMarkdown(
    `Generate a character concept for a DnD 5th edition game. Use these keywords to generate something: ${prompt}`,
    npcSchema
  );
  const html = new showdown.Converter({ tables: true }).makeHtml(markdown);

  return sanitizeHtml(html);
}
