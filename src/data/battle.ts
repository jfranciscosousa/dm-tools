import client from "./client";
import { players } from "./players";

const CURRENT_TURN = "currentTurn";
const ROUND_NUMBER = "roundNumber";

export async function currentTurn(): Promise<number> {
  const setting = await client.settings.where({ key: CURRENT_TURN }).first();

  return setting?.value;
}

export async function roundNumber(): Promise<number> {
  const setting = await client.settings.where({ key: ROUND_NUMBER }).first();

  return setting?.value;
}

export const currentTurn$ = client.useQuery(currentTurn);
export const roundNumber$ = client.useQuery(roundNumber);

export async function nextTurn(): Promise<void> {
  const currentTurnVal = await currentTurn();
  const roundNumberVal = await roundNumber();

  if (currentTurnVal === undefined || currentTurnVal === null) {
    await client.settings.put({ key: CURRENT_TURN, value: 0 });
    await client.settings.put({ key: ROUND_NUMBER, value: 1 });
  } else {
    await client.settings.put({
      key: CURRENT_TURN,
      value: currentTurnVal + 1,
    });
  }

  if (currentTurnVal === (await players()).length - 1) {
    await client.settings.put({ key: CURRENT_TURN, value: 0 });
    await client.settings.put({
      key: ROUND_NUMBER,
      value: roundNumberVal + 1,
    });
  }
}

export async function endBattle(): Promise<void> {
  await client.settings.put({ key: CURRENT_TURN, value: undefined });
  await client.settings.put({
    key: ROUND_NUMBER,
    value: undefined,
  });
}
