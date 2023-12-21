import { generateNpc } from "$lib/modules/Npc/generateNpc";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const prompt = formData.get("prompt") as string;

    try {
      return { success: true, data: await generateNpc(prompt), prompt };
    } catch (error) {
      console.error(error);
      return { success: false, error: (error as Error)?.message || "Unknown error", prompt };
    }
  }
};
