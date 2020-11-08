export default function validatePlayersStore(
  data: InternalPlayersStore
): boolean {
  if (data.roundNumber && typeof data.roundNumber !== "number") return false;
  if (data.currentTurn && typeof data.currentTurn !== "number") return false;
  if (typeof data.players !== "object") return false;

  if (Object.keys(data.players).length === 0) return true;

  const player = data.players[Object.keys(data.players)[0]];

  if (typeof player.id !== "string") return false;
  if (typeof player.name !== "string") return false;
  if (typeof player.initiative !== "number") return false;

  return true;
}
