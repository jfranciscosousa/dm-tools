import { generateMarkdown } from "$lib/ai.server";
import { error } from "@sveltejs/kit";
import sanitizeHtml from "sanitize-html";
import showdown from "showdown";

export const generators = {
  npc: {
    markdown: `
    ### <PLACEHOLDER:name>

    **Race: <PLACEHOLDER:npc race>**

    **Alignment: <PLACEHOLDER:npc alignment>**

    ### Description
    <PLACEHOLDER:a short appearance of the npc>

    ### Backstory
    <PLACEHOLDER:a short backstory>

    ### Roleplaying tips
    <PLACEHOLDER: a bullet item list of at most 5 tips for DM to roleplay>
    `,
    prompt:
      "Generate a npc for a roleplaying game for the DM to improvise with the following prompt: "
  },
  shop: {
    markdown: `
    ### <PLACEHOLDER:shop name>

    <PLACEHOLDER:long description to be read out loud to the players>

    ### Shop Owner

    **Name: <PLACEHOLDER:shop owner name>**
    **Race: <PLACEHOLDER:shop owner race>**
    **Class: <PLACEHOLDER:shop owner class>**

    **Physical Description:** <PLACEHOLDER:shop owner physical description>

    **Backstory:** <PLACEHOLDER:shop owner backstory>

    **DM Roleplay Info:** <PLACEHOLDER:dm roleplay info for shop owner>

    ### Items for Sale

    <PLACEHOLDER:at least 6 items in the format:
    - **Item Name** - Price gp - Description with stats and effects>

    ### Secret

    <PLACEHOLDER:a secret about the shop>

    ### Image Description

    <PLACEHOLDER:description for DALL-E 3 showing both the shop and owner>
    `,
    prompt: "Generate a shop for a DnD 5th edition game. Use these keywords to generate something:"
  },
  tavern: {
    markdown: `
    ### <PLACEHOLDER:tavern name>

    <PLACEHOLDER:long description to be read out loud to the players>

    ### Drinks

    <PLACEHOLDER:drinks list in format:
    - **Drink Name** - Price gp - Short description>

    ### Foods

    <PLACEHOLDER:foods list in format:
    - **Food Name** - Price gp - Short description>

    ### Interesting Characters

    <PLACEHOLDER:at least 5 characters, one must be the barkeep, in format:

    **Character Name** (Race Class)
    - **Physical Description:** description
    - **Backstory:** backstory
    - **DM Roleplay Info:** roleplay info
    - **Quest:** potential quest
    - **Current Activity:** what they're doing in the tavern>

    ### Secret

    <PLACEHOLDER:a secret about the tavern>

    ### Image Description

    <PLACEHOLDER:description for DALL-E 3 showing the tavern>
    `,
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

  const markdown = await generateMarkdown(`${options.prompt}:${prompt}`, options.markdown, {
    temperature: 0.8
  });
  const html = new showdown.Converter({ tables: true }).makeHtml(markdown);

  return sanitizeHtml(html);
}
