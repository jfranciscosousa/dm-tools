import { Readable, readable } from "svelte/store";
import client from "./client";

export default function liveQuery<T>(
  query: () => Promise<T>,
  defaultValue = undefined
): Readable<T> {
  return readable(defaultValue, (set) => {
    query().then((value) => set(value));

    client.on("changes", async (changes) => {
      console.log(changes);
      set(await query());
    });
  });
}
