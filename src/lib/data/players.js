import client from "./client";
export function getPlayers() {
    return client.players.toCollection().reverse().sortBy("initiative");
}
export async function addPlayer(player) {
    await client.players.add(player);
}
export async function editPlayer(id, changes) {
    await client.players.update(id, changes);
}
export async function deletePlayer(id) {
    await client.players.delete(id);
}
export async function clearPlayers() {
    await client.players.clear();
}
