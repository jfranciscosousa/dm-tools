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
