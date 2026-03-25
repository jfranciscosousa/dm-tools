export interface Condition {
  label: string;
  duration: number | null; // null = infinite (manual removal only); number = remaining rounds
}

export interface Player {
  id: number;
  name: string;
  initiative: number;
  damage: number;
  conditions: Condition[];
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
