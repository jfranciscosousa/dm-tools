export interface Player {
  id: number;
  name: string;
  initiative: number;
  damage: number;
}

export interface Setting {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface InternalPlayersStore {
  players: { [id: string]: Player };
  currentTurn?: number;
  roundNumber: number;
}

export interface PlayersStore {
  players: Player[];
  currentTurn?: number;
  roundNumber: number;
}
