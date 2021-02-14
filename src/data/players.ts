import client from "./client";

export function players(): Promise<Player[]> {
  return client.players.toCollection().reverse().sortBy("initiative");
}

export const players$ = client.useQuery(players);

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
