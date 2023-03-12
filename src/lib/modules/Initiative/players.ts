import client from "$lib/data/client";
import type { Player } from "$lib/types";

export function getPlayers(): Promise<Player[]> {
  return client.players.toCollection().reverse().sortBy("initiative");
}

export async function addPlayer(player: Omit<Player, "id">): Promise<void> {
  await client.players.add(player as Player);
}

export async function editPlayer(id: number, changes: Partial<Omit<Player, "id">>): Promise<void> {
  await client.players.update(id, changes);
}

export async function deletePlayer(id: number): Promise<void> {
  await client.players.delete(id);
}

export async function clearPlayers(): Promise<void> {
  await client.players.clear();
}
