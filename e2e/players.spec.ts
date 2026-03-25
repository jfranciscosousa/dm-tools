import { waitFor } from "@playwright-testing-library/test";
import type { Screen } from "@playwright-testing-library/test/dist/fixture/types";
import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures
} from "@playwright-testing-library/test/fixture.js";
import { test as base } from "@playwright/test";

const test = base.extend<TestingLibraryFixtures>(fixtures);

const { expect } = test;

async function insertPlayer(screen: Screen, player: string, initiative: string) {
  await screen.fill("input[name=playerName]", player);
  await screen.fill("input[name=initiative]", initiative);
  await screen.click("form button[type=submit]");

  // Initiative is now in a <kbd> and name is in <p class="name"> — check name appears
  await screen.findByText(player);
}

test.beforeEach(({ page }) => {
  page.on("dialog", async (dialog) => {
    await dialog.accept();
  });
});

test("enters a player into the initiative list", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");

  await expect(page.locator("p.name").filter({ hasText: "Warrior Elf 420" })).toBeVisible();
});

test("sorts players based on initiative", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");

  const playerList = screen.queryAllByTestId("player-listitem");
  const players = await Promise.all(
    Array.from(await playerList.all()).map(async (player) => {
      return (await player.locator("p.name").textContent())?.trim();
    })
  );

  expect(players).toEqual(["Barbarian", "Warrior Elf 420", "Ranger"]);
});

test("deletes a player from the list", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");

  await screen.getByLabel("Delete Warrior Elf 420").click();

  const playerList = screen.queryAllByTestId("player-listitem");

  await expect(playerList).toHaveCount(0);
});

test("resets the players list", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");
  await (await screen.findByText("Reset")).click();

  await waitFor(async () => {
    const playerList = screen.queryAllByTestId("player-listitem");

    expect(await playerList.count()).toEqual(0);
  });
});

test("starts a battle at round 1", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");
  await (await screen.findByText("Start battle")).click();

  expect(await screen.findByText("Round 1")).toHaveCount(1);
});

test("changes the active player after ending a turn", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");
  await insertPlayer(screen, "Barbarian", "10");
  await (await screen.findByText("Start battle")).click();
  await (await screen.findByText("Next turn")).click();

  expect(await screen.findByText("Round 1")).toHaveCount(1);

  await page.waitForSelector('[data-currentturn=false]:has-text("Warrior")');
  await page.waitForSelector('[data-currentturn=true]:has-text("Barbarian")');
});

test("goes to the next round", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");
  await insertPlayer(screen, "Barbarian", "10");
  await (await screen.findByText("Start battle")).click();
  await (await screen.findByText("Next turn")).click();
  await (await screen.findByText("Next turn")).click();

  expect(await screen.findByText("Round 2")).toHaveCount(1);
});

test("persists the data even on a reload", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");

  await page.reload();

  await waitFor(async () => {
    const playerList = screen.queryAllByTestId("player-listitem");
    const players = await Promise.all(
      Array.from(await playerList.all()).map(async (player) => {
        return (await player.locator("p.name").textContent())?.trim();
      })
    );

    expect(players).toEqual(["Barbarian", "Warrior Elf 420", "Ranger"]);
  });
});

test("adds a condition to a player", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");

  await screen.fill("input[name=condition]", "Poisoned");
  await page.keyboard.press("Enter");

  expect(await screen.findByText("Poisoned")).toHaveCount(1);
});

test("adds a timed condition showing remaining rounds", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");

  await screen.fill("input[name=condition]", "Exhaustion 3");
  await page.keyboard.press("Enter");

  expect(await screen.findByText("Exhaustion (3)")).toHaveCount(1);
});

test("removes a condition manually", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");

  await screen.fill("input[name=condition]", "Poisoned");
  await page.keyboard.press("Enter");

  await (await screen.findByText("Poisoned")).waitFor();
  await page.click("button[aria-label='Remove Poisoned']");

  await waitFor(async () => {
    expect(await screen.queryAllByText("Poisoned").count()).toBe(0);
  });
});

test("decrements timed condition on the active player's next turn", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  // Warrior (20) goes first, Barbarian (10) goes second.
  await insertPlayer(screen, "Warrior", "20");
  await insertPlayer(screen, "Barbarian", "10");

  // Scope to Warrior's row (first item in list, sorted by initiative desc)
  // Two players means two inputs — must scope to avoid ambiguity.
  await page
    .locator('[data-testid="player-listitem"]:first-child input[name=condition]')
    .fill("Stunned 2");
  await page.keyboard.press("Enter");

  await (await screen.findByText("Start battle")).click();
  // Warrior is active (first turn — no decrement on battle start)
  expect(await screen.findByText("Stunned (2)")).toHaveCount(1);

  await (await screen.findByText("Next turn")).click();
  // Barbarian's turn — Warrior's condition unchanged
  expect(await screen.findByText("Stunned (2)")).toHaveCount(1);

  await (await screen.findByText("Next turn")).click();
  // Back to Warrior's turn — decrement
  expect(await screen.findByText("Stunned (1)")).toHaveCount(1);
});

test("removes timed condition and shows expiry notification when duration hits 0", async ({
  screen,
  page
}) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");
  await insertPlayer(screen, "Barbarian", "10");

  // Scope to Warrior's row — two players means two inputs.
  await page
    .locator('[data-testid="player-listitem"]:first-child input[name=condition]')
    .fill("Stunned 1");
  await page.keyboard.press("Enter");

  await (await screen.findByText("Start battle")).click();
  await (await screen.findByText("Next turn")).click(); // Barbarian's turn
  await (await screen.findByText("Next turn")).click(); // Back to Warrior — condition expires

  // Expiry notification visible (alert includes a ⚠ prefix)
  expect(await screen.findByText(/Stunned expired/)).toHaveCount(1);

  // Pill is gone
  await waitFor(async () => {
    expect(await screen.queryAllByText(/Stunned \(\d+\)/).count()).toBe(0);
  });
});

test("clears all conditions when battle ends", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");

  await screen.fill("input[name=condition]", "Poisoned");
  await page.keyboard.press("Enter");

  await (await screen.findByText("Start battle")).click();
  await (await screen.findByText("End battle")).click();

  await waitFor(async () => {
    expect(await screen.queryAllByText("Poisoned").count()).toBe(0);
  });
});
