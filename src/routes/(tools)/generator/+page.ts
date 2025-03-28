import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url }) => {
  return { variant: url.searchParams.get("variant") || "npc" };
};
