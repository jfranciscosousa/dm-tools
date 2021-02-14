import Dexie from "dexie";
import "dexie-observable";
import { Readable, readable } from "svelte/store";

export class MyAppDatabase extends Dexie {
  players: Dexie.Table<Player, number>;

  settings: Dexie.Table<Setting, string>;

  $players: Readable<Player[]>;

  constructor() {
    super("MyDatabase");

    this.version(1).stores({
      players: "++id, name, initiative, damage",
      settings: "key&, value",
    });

    this.players = this.table("players");
    this.settings = this.table("settings");

    this.$players = this.useQuery(() =>
      this.players.toCollection().reverse().sortBy("initiative")
    );
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

const db = new MyAppDatabase();

export default db;
