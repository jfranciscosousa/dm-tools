import client from './client';
import { getPlayers } from './players';

const CURRENT_TURN = 'currentTurn';
const ROUND_NUMBER = 'roundNumber';

export async function getCurrentTurn(): Promise<number> {
	const setting = await client.settings.where({ key: CURRENT_TURN }).first();

	return setting?.value;
}

export async function getRoundNumber(): Promise<number> {
	const setting = await client.settings.where({ key: ROUND_NUMBER }).first();

	return setting?.value;
}

export async function nextTurn(): Promise<void> {
	const currentTurnVal = await getCurrentTurn();
	const roundNumberVal = await getRoundNumber();

	if (currentTurnVal === undefined || currentTurnVal === null) {
		await client.settings.put({ key: CURRENT_TURN, value: 0 });
		await client.settings.put({ key: ROUND_NUMBER, value: 1 });
	} else {
		await client.settings.put({
			key: CURRENT_TURN,
			value: currentTurnVal + 1
		});
	}

	if (currentTurnVal === (await getPlayers()).length - 1) {
		await client.settings.put({ key: CURRENT_TURN, value: 0 });
		await client.settings.put({
			key: ROUND_NUMBER,
			value: roundNumberVal + 1
		});
	}
}

export async function endBattle(): Promise<void> {
	await client.settings.put({ key: CURRENT_TURN, value: undefined });
	await client.settings.put({
		key: ROUND_NUMBER,
		value: undefined
	});
}
