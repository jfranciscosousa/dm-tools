import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import client from "./client";

const CACHE: Record<string, unknown> = {};

export default function liveQuery<T>(
  queryKey: string,
  query: () => Promise<T>,
  defaultValue?: T
): Readable<T> {
  return readable(defaultValue, (set) => {
    if (CACHE[queryKey]) set(CACHE[queryKey] as T);

    query().then((value) => {
      set(value);

      CACHE[queryKey] = value;
    });

    client.on("changes", async () => {
      set(await query());
    });
  });
}
