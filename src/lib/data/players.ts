import type { Player } from "$lib/types";
import client from "./client";

export function getPlayers(): Promise<Player[]> {
  return client.players.toCollection().reverse().sortBy("initiative");
}

export async function addPlayer(player: Player): Promise<void> {
  await client.players.add(player);
}

export async function editPlayer(id: number, changes: any): Promise<void> {
  await client.players.update(id, changes);
}

export async function deletePlayer(id: number): Promise<void> {
  await client.players.delete(id);
}

export async function clearPlayers(): Promise<void> {
  await client.players.clear();
}
