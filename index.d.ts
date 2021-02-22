interface Player {
  id?: number;
  name: string;
  initiative: number;
  damage: number;
}

interface Setting {
  key: string;
  value: any;
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

declare module "svelte-routing";
declare module "svelte-loadable";
