import { redirect, type Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const handle: Handle = async ({ event, resolve }) => {
  if (env.PASSWORD) {
    if (event.cookies.get("PASSWORD") !== env.PASSWORD && event.url.pathname != "/login") {
      return redirect(307, "/login");
    }
  }

  return resolve(event);
};
