/* eslint-disable no-bitwise */
import { writable } from "svelte/store";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (code) => {
    const seed = (Math.random() * 16) | 0;
    const bytes = code === "x" ? seed : (seed & 0x3) | 0x8;

    return bytes.toString(16);
  });
}

function loadPlayersFromStorage() {
  const jsonString = localStorage.getItem("players");

  if (!jsonString) return [];

  return JSON.parse(jsonString);
}

function createPlayers() {
  const { subscribe, update } = writable(loadPlayersFromStorage());

  async function addPlayer({ name, initiative }) {
    update((players) => {
      const newPlayers = [...players, { id: uuidv4(), name, initiative }].sort(
        (player1, player2) => player2.initiative - player1.initiative
      );

      localStorage.setItem("players", JSON.stringify(newPlayers));

      return newPlayers;
    });
  }

  function deletePlayer(id) {
    update((players) => {
      const newPlayers = players.filter((player) => player.id !== id);

      localStorage.setItem("players", JSON.stringify(newPlayers));

      return newPlayers;
    });
  }

  function resetPlayers() {
    update(() => {
      const newPlayers = [];

      localStorage.setItem("players", JSON.stringify(newPlayers));

      return newPlayers;
    });
  }

  return {
    subscribe,
    addPlayer,
    deletePlayer,
    resetPlayers,
  };
}

const players = createPlayers();

export default players;
