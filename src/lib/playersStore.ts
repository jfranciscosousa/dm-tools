/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

import { readable, writable } from "svelte/store";

interface Player {
  id?: string;
  name: string;
  initiative: number;
}

interface InternalPlayersStore {
  players: { [id: string]: Player };
  currentTurn?: number;
  roundNumber: number;
}

interface PlayersStore {
  players: Player[];
  currentTurn?: number;
  roundNumber: number;
}

function initialState(): InternalPlayersStore {
  return {
    players: {},
    currentTurn: null,
    roundNumber: null,
  };
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (code) => {
    const seed = (Math.random() * 16) | 0;
    const bytes = code === "x" ? seed : (seed & 0x3) | 0x8;

    return bytes.toString(16);
  });
}

function loadPlayersFromStorage(): InternalPlayersStore {
  const rawPlayers = localStorage.getItem("players");

  if (!rawPlayers) return initialState();

  return JSON.parse(rawPlayers);
}

function createPlayersStore() {
  const { subscribe, set, update } = writable(loadPlayersFromStorage());
  // We want the readable state of the store to be a players list, so we wrap
  // the writable store inside a readable and we edit it with the subscribe function
  const { subscribe: readableSubscribe } = readable(
    {} as PlayersStore,
    (set) => {
      subscribe((store) => {
        const sortedPlayersList = Object.values(store.players).sort(
          (player1, player2) => player2.initiative - player1.initiative
        );

        set({ ...store, players: sortedPlayersList });
      });
    }
  );

  subscribe((store) => {
    localStorage.setItem("players", JSON.stringify(store));
  });

  return {
    subscribe: readableSubscribe,

    add(player: Player) {
      update((store) => {
        const newPlayer = { id: uuidv4(), ...player };

        store.players[newPlayer.id] = newPlayer;

        return store;
      });
    },

    nextTurn() {
      update((store) => {
        if (store.roundNumber == null) store.roundNumber = 1;

        if (store.currentTurn === null || store.currentTurn === undefined) {
          store.currentTurn = 0;
        } else store.currentTurn += 1;

        if (store.currentTurn >= Object.keys(store.players).length) {
          store.currentTurn = 0;

          store.roundNumber += 1;
        }

        return store;
      });
    },

    endBattle() {
      update((store) => {
        return { ...store, currentTurn: null, roundNumber: null };
      });
    },

    delete(id: string) {
      update((store) => {
        delete store.players[id];

        return store;
      });
    },

    reset() {
      set(initialState());
    },
  };
}

const players = createPlayersStore();

export default players;
