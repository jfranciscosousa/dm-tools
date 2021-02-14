import Dexie from "dexie";
import "dexie-observable";
import { Readable, readable } from "svelte/store";

export class MyAppDatabase extends Dexie {
  players: Dexie.Table<Player, number>;

  settings: Dexie.Table<Setting, string>;

  constructor() {
    super("MyDatabase");

    this.version(1).stores({
      players: "++id, name, initiative, damage",
      settings: "key&, value",
    });

    this.players = this.table("players");
    this.settings = this.table("settings");
  }

  useQuery<T>(query: () => Promise<T>, defaultValue = undefined): Readable<T> {
    return readable(defaultValue, (set) => {
      query().then((value) => set(value));

      this.on("changes", async () => {
        set(await query());
      });
    });
  }
}

const client = new MyAppDatabase();

export default client;
