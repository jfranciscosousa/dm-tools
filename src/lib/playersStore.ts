/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

import { writable } from "svelte/store";

interface Player {
  id?: string;
  name: string;
  initiative: number;
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (code) => {
    const seed = (Math.random() * 16) | 0;
    const bytes = code === "x" ? seed : (seed & 0x3) | 0x8;

    return bytes.toString(16);
  });
}

function loadPlayersFromStorage(): Player[] {
  const rawPlayers = localStorage.getItem("players");

  if (!rawPlayers) return [];

  return JSON.parse(rawPlayers);
}

function createPlayersStore() {
  const { subscribe, set, update } = writable(loadPlayersFromStorage());

  subscribe((players) =>
    localStorage.setItem("players", JSON.stringify(players))
  );

  return {
    subscribe,

    add(player: Player) {
      const newPlayer: Player = { id: uuidv4(), ...player };

      update((players) =>
        [newPlayer, ...players].sort(
          (player1, player2) => player2.initiative - player1.initiative
        )
      );
    },

    delete(id: string) {
      update((players) => players.filter((player) => player.id !== id));
    },

    reset() {
      set([]);
    },
  };
}

const players = createPlayersStore();

export default players;
