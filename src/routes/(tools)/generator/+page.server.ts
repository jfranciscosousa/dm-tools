import type { Config } from "@sveltejs/adapter-vercel";
import type { Actions } from "./$types";
import { generate } from "./_generators";

export const config: Config = {
  runtime: "nodejs22.x"
};

export const actions: Actions = {
  default: async (event) => {
    const variant = event.url.searchParams.get("variant") || "npc";
    const formData = await event.request.formData();
    const prompt = formData.get("prompt") as string;

    try {
      return { success: true, data: await generate(variant, prompt), prompt };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error)?.message || "Unknown error", prompt };
    }
  }
};
