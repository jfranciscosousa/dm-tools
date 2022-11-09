import { readable } from "svelte/store";
import client from "./client";
const CACHE = {};
export default function liveQuery(queryKey, query, defaultValue = undefined) {
    return readable(defaultValue, (set) => {
        if (CACHE[queryKey])
            set(CACHE[queryKey]);
        query().then((value) => {
            set(value);
            CACHE[queryKey] = value;
        });
        client.on("changes", async (changes) => {
            set(await query());
        });
    });
}
