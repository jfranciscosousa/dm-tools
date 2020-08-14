/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */

import { createOvermind } from "overmind";
import { createMixin } from "overmind-svelte";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (code) => {
    const seed = (Math.random() * 16) | 0;
    const bytes = code === "x" ? seed : (seed & 0x3) | 0x8;

    return bytes.toString(16);
  });
}

function loadPlayersFromStorage() {
  const rawPlayers = localStorage.getItem("players");

  if (!rawPlayers) return [];

  return JSON.parse(rawPlayers);
}

const overmindObj = {
  state: {
    players: loadPlayersFromStorage(),
  },

  actions: {
    addPlayer({ state }, { name, initiative }) {
      const newPlayer = { id: uuidv4(), name, initiative };

      state.players = [newPlayer, ...state.players].sort(
        (player1, player2) => player2.initiative - player1.initiative
      );
    },

    deletePlayer({ state }, id) {
      state.players = state.players.filter((player) => player.id !== id);
    },

    resetPlayers({ state }) {
      state.players = [];
    },
  },

  onInitialize: async ({ state }, overmind) => {
    overmind.addMutationListener((mutation) => {
      if (mutation.path.indexOf("players") === 0) {
        localStorage.setItem("players", JSON.stringify(state.players));
      }
    });
  },
};

const store = createMixin(createOvermind(overmindObj));

export const { state, actions } = store;
