import type { Actions, PageServerLoad } from "./$types";
import { generate } from "./_generators";

export const load: PageServerLoad = async ({ url }) => {
  return { variant: url.searchParams.get("variant") || "npc" };
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
