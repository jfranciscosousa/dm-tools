import type { Player, Setting } from '$lib/types';
import Dexie from 'dexie';
import 'dexie-observable';

export class MyAppDatabase extends Dexie {
	players: Dexie.Table<Player, number>;
	settings: Dexie.Table<Setting, string>;

	constructor() {
		super('DMToolsDB');

		this.version(1).stores({
			players: '++id, name, initiative, damage',
			settings: 'key&, value'
		});

		this.players = this.table('players');
		this.settings = this.table('settings');
	}
}

const client = new MyAppDatabase();

export default client;
