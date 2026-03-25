import type { Player, Setting } from "$lib/types";
import Dexie from "dexie";
import "dexie-observable";

export class MyAppDatabase extends Dexie {
  players: Dexie.Table<Player, number>;
  settings: Dexie.Table<Setting, string>;

  constructor() {
    super("DMToolsInitiative");

    this.version(1).stores({
      players: "++id, name, initiative, damage",
      settings: "key&, value"
    });

    this.version(2)
      .stores({
        players: "++id, name, initiative, damage",
        settings: "key&, value"
      })
      .upgrade((tx) =>
        tx
          .table("players")
          .toCollection()
          .modify((p: Player) => {
            if (!p.conditions) p.conditions = [];
          })
      );

    this.players = this.table("players");
    this.settings = this.table("settings");
  }
}

const client = new MyAppDatabase();

export default client;
