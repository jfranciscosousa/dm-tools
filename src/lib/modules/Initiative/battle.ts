import client from "$lib/data/client";
import type { Condition } from "$lib/types";
import { getPlayers } from "./players";

const CURRENT_TURN = "currentTurn";
const ROUND_NUMBER = "roundNumber";

export async function getCurrentTurn(): Promise<number> {
  const setting = await client.settings.where({ key: CURRENT_TURN }).first();
  return setting?.value;
}

export async function getRoundNumber(): Promise<number> {
  const setting = await client.settings.where({ key: ROUND_NUMBER }).first();
  return setting?.value;
}

export interface NextTurnResult {
  expiredConditions: { playerName: string; labels: string[] } | null;
}

export async function nextTurn(): Promise<NextTurnResult> {
  return client.transaction("rw", client.players, client.settings, async () => {
    const players = await getPlayers();
    if (players.length === 0) return { expiredConditions: null };

    const currentTurnVal = await getCurrentTurn();
    const roundNumberVal = await getRoundNumber();

    const isFirstTurn = currentTurnVal === undefined || currentTurnVal === null;

    let nextIndex: number;
    let nextRound: number;

    if (isFirstTurn) {
      nextIndex = 0;
      nextRound = 1;
    } else {
      nextIndex = (currentTurnVal + 1) % players.length;
      nextRound = nextIndex === 0 ? (roundNumberVal ?? 1) + 1 : (roundNumberVal ?? 1);
    }

    await client.settings.put({ key: CURRENT_TURN, value: nextIndex });
    await client.settings.put({ key: ROUND_NUMBER, value: nextRound });

    // Skip condition decrement on battle start — no time has passed yet.
    if (isFirstTurn) {
      return { expiredConditions: null };
    }

    const player = players[nextIndex];
    const hasTimed = player.conditions.some((c: Condition) => c.duration !== null);

    if (!hasTimed) {
      return { expiredConditions: null };
    }

    const expiredLabels: string[] = [];
    const updatedConditions: Condition[] = player.conditions
      .map((c: Condition) => {
        if (c.duration === null) return c;
        const newDuration = c.duration - 1;
        if (newDuration <= 0) {
          expiredLabels.push(c.label);
          return null;
        }
        return { ...c, duration: newDuration };
      })
      .filter((c): c is Condition => c !== null);

    await client.players.update(player.id, { conditions: updatedConditions });

    return {
      expiredConditions:
        expiredLabels.length > 0 ? { playerName: player.name, labels: expiredLabels } : null
    };
  });
}

export async function endBattle(): Promise<void> {
  await client.transaction("rw", client.players, client.settings, async () => {
    await client.settings.put({ key: CURRENT_TURN, value: undefined });
    await client.settings.put({ key: ROUND_NUMBER, value: undefined });
    await client.players.toCollection().modify({ conditions: [] });
  });
}
