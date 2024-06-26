import type { Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const handle: Handle = async ({ event, resolve }) => {
  if (env.ADMIN_LOGIN) {
    const auth = event.request.headers.get("Authorization");

    if (auth !== `Basic ${btoa(env.ADMIN_LOGIN)}`) {
      return new Response("Not authorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="User Visible Realm", charset="UTF-8"'
        }
      });
    }
  }

  return resolve(event);
};
