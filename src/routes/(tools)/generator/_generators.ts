import { generateMarkdown } from "$lib/openai";
import { error } from "@sveltejs/kit";
import sanitizeHtml from "sanitize-html";
import showdown from "showdown";
import { z } from "zod";

export const generators = {
  npc: {
    schema: z.object({
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
      backgroundLong: z
        .string()
        .describe("A small paragraph describing this character story so far"),
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
    }),
    prompt:
      "Generate a character concept for a DnD 5th edition game. Use these keywords to generate something:"
  },
  shop: {
    schema: z.object({
      name: z.string(),
      longDescription: z.string().describe("To be read out loud to the players"),
      secret: z.string(),
      items: z
        .array(
          z.object({
            price: z.string().describe("Try to balance the price for 5e rules."),
            name: z.string(),
            description: z.string().describe("Stats, effects, etc")
          })
        )
        .describe("At least some 6 items"),
      shopOwner: z.object({
        name: z.string(),
        race: z.string(),
        class: z.string(),
        physicalDescription: z.string(),
        backstory: z.string(),
        dmRoleplayInfo: z.string()
      }),
      imagePrompt: z
        .string()
        .describe(
          "Prompt that will be used to generate image with DALL E 3. Put both the shop and the owner in focus"
        )
    }),
    prompt:
      "Generate a tavern for a DnD 5th edition game. Use these keywords to generate something:"
  },
  tavern: {
    schema: z.object({
      name: z.string(),
      longDescription: z.string().describe("To be read out loud to the players"),
      secret: z.string(),
      drinks: z.array(z.object({ shortDescription: z.string(), price: z.string() })),
      foods: z.array(z.object({ shortDescription: z.string(), price: z.string() })),
      interestingCharacters: z
        .array(
          z.object({
            name: z.string(),
            race: z.string(),
            class: z.string(),
            physicalDescription: z.string(),
            backstory: z.string(),
            dmRoleplayInfo: z.string(),
            quest: z.string(),
            where: z.string().describe("What the character is doing inside the tavern")
          })
        )
        .describe("At least 5 characters, and one of them always has to be the barkeep."),
      imagePrompt: z.string().describe("Prompt that will be used to generate image with DALL E 3")
    }),
    prompt:
      "Generate a tavern for a DnD 5th edition game. Use these keywords to generate something:"
  }
} as const;

export async function generate(
  variant: string | null | undefined,
  prompt: string
): Promise<string> {
  const options = generators[variant as keyof typeof generators];

  if (!options) throw error(404);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markdown = await generateMarkdown(`${options.prompt}:${prompt}`, options.schema as any);
  const html = new showdown.Converter({ tables: true }).makeHtml(markdown);

  return sanitizeHtml(html);
}
