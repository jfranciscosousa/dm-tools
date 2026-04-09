import { generateStructured } from "$lib/ai.server";
import { error } from "@sveltejs/kit";
import sanitizeHtml from "sanitize-html";
import showdown from "showdown";
import { z } from "zod";

// ─── Generator factory ───────────────────────────────────────────────────────

type Generator = {
  run: (userPrompt: string) => Promise<string>;
};

function makeGenerator<T>({
  schema,
  prompt,
  toMarkdown
}: {
  schema: z.ZodType<T>;
  prompt: string;
  toMarkdown: (data: T) => string;
}): Generator {
  return {
    run: (userPrompt) =>
      generateStructured(`${prompt} ${userPrompt}`, schema, { temperature: 0.8 }).then(toMarkdown)
  };
}

// ─── Generators ──────────────────────────────────────────────────────────────

const npcGenerator = makeGenerator({
  schema: z.object({
    name: z.string(),
    race: z.string(),
    alignment: z.string(),
    description: z.string(),
    backstory: z.string(),
    roleplaying_tips: z.array(z.string())
  }),
  prompt:
    "Generate an NPC for a roleplaying game for the DM to improvise with the following prompt:",
  toMarkdown: (npc) => `### ${npc.name}

**Race:** ${npc.race}

**Alignment:** ${npc.alignment}

### Description
${npc.description}

### Backstory
${npc.backstory}

### Roleplaying Tips
${npc.roleplaying_tips.map((tip) => `- ${tip}`).join("\n")}`
});

const shopGenerator = makeGenerator({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    owner: z.object({
      name: z.string(),
      race: z.string(),
      class: z.string(),
      physical_description: z.string(),
      backstory: z.string(),
      roleplay_info: z.string()
    }),
    items: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string()
      })
    ),
    secret: z.string()
  }),
  prompt: "Generate a shop for a DnD 5th edition game. Use these keywords to generate something:",
  toMarkdown: (shop) => `### ${shop.name}

${shop.description}

### Shop Owner

**Name:** ${shop.owner.name}
**Race:** ${shop.owner.race}
**Class:** ${shop.owner.class}

**Physical Description:** ${shop.owner.physical_description}

**Backstory:** ${shop.owner.backstory}

**DM Roleplay Info:** ${shop.owner.roleplay_info}

### Items for Sale

${shop.items.map((item) => `- **${item.name}** - ${item.price} gp - ${item.description}`).join("\n")}

### Secret

${shop.secret}`
});

const tavernGenerator = makeGenerator({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    drinks: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string()
      })
    ),
    foods: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
        description: z.string()
      })
    ),
    characters: z.array(
      z.object({
        name: z.string(),
        race: z.string(),
        class: z.string(),
        physical_description: z.string(),
        backstory: z.string(),
        roleplay_info: z.string(),
        quest: z.string(),
        current_activity: z.string()
      })
    ),
    secret: z.string()
  }),
  prompt: "Generate a tavern for a DnD 5th edition game. Use these keywords to generate something:",
  toMarkdown: (tavern) => `### ${tavern.name}

${tavern.description}

### Drinks

${tavern.drinks.map((d) => `- **${d.name}** - ${d.price} gp - ${d.description}`).join("\n")}

### Foods

${tavern.foods.map((f) => `- **${f.name}** - ${f.price} gp - ${f.description}`).join("\n")}

### Interesting Characters

${tavern.characters
  .map(
    (c) => `**${c.name}** (${c.race} ${c.class})
- **Physical Description:** ${c.physical_description}
- **Backstory:** ${c.backstory}
- **DM Roleplay Info:** ${c.roleplay_info}
- **Quest:** ${c.quest}
- **Current Activity:** ${c.current_activity}`
  )
  .join("\n\n")}

### Secret

${tavern.secret}`
});

// ─── Registry & public API ───────────────────────────────────────────────────

const generators = {
  npc: npcGenerator,
  shop: shopGenerator,
  tavern: tavernGenerator
};

export async function generate(
  variant: string | null | undefined,
  prompt: string
): Promise<string> {
  const gen = generators[variant as keyof typeof generators];

  if (!gen) throw error(404);

  const markdown = await gen.run(prompt);
  const html = new showdown.Converter({ tables: true }).makeHtml(markdown);

  return sanitizeHtml(html);
}
