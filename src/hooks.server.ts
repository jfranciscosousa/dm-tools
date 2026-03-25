import { redirect, type Handle } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export const handle: Handle = async ({ event, resolve }) => {
  // Hack since AI Gateway only reads for process.env
  if (env.VERCEL_OIDC_TOKEN) {
    process.env = { ...process.env, VERCEL_OIDC_TOKEN: env.VERCEL_OIDC_TOKEN };
  }

  if (env.PASSWORD) {
    if (event.cookies.get("PASSWORD") !== env.PASSWORD && event.url.pathname != "/login") {
      return redirect(307, "/login");
    }
  }

  return resolve(event);
};
