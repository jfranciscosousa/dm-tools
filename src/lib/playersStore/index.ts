/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

import { readable, writable } from "svelte/store";
import validatePlayersStore from "./validator";

export const PLAYERS_STORE_KEY = "players";

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
  const rawPlayers = localStorage.getItem(PLAYERS_STORE_KEY);
  const players = (() => {
    try {
      return JSON.parse(rawPlayers);
    } catch (error) {
      return false;
    }
  })();

  if (!players) return initialState();

  if (!validatePlayersStore(players)) return initialState();

  return players;
}

// We want the readable state of the store to be a players list, so we wrap
// the writable store inside a readable and we edit it with the subscribe function
function wrapSubscribe(subscribe) {
  return readable({} as PlayersStore, (internalSet) => {
    subscribe((store) => {
      const sortedPlayersList = Object.values(store.players).sort(
        (player1: Player, player2: Player) =>
          player2.initiative - player1.initiative
      );

      internalSet({ ...store, players: sortedPlayersList });
    });
  }).subscribe;
}

function createPlayersStore() {
  const { subscribe, set, update } = writable(loadPlayersFromStorage());

  subscribe((store) => {
    localStorage.setItem(PLAYERS_STORE_KEY, JSON.stringify(store));
  });

  return {
    subscribe: wrapSubscribe(subscribe),

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
      update((store) => ({ ...store, currentTurn: null, roundNumber: null }));
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
