export interface Player {
	id?: number;
	name: string;
	initiative: number;
	damage: number;
}

export interface Setting {
	key: string;
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
