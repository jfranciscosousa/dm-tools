import { env } from "$env/dynamic/private";
import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  if (cookies.get("PASSWORD") === env.PASSWORD) {
    redirect(303, "/");
  }

  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const inviteToken = formData.get("inviteToken") as string;

    if (inviteToken !== env.PASSWORD) {
      return {
        success: false,
        error: "Invite token is invalid!",
        inviteToken
      };
    }
    event.cookies.set("PASSWORD", inviteToken, { maxAge: 31_556_926, path: "/" });

    redirect(303, "/");
  }
};
