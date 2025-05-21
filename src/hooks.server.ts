import { redirect, type Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { VERCEL_OIDC_TOKEN } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  process.env = { ...process.env, VERCEL_OIDC_TOKEN };

  if (env.PASSWORD) {
    if (event.cookies.get("PASSWORD") !== env.PASSWORD && event.url.pathname != "/login") {
      return redirect(307, "/login");
    }
  }

  return resolve(event);
};
