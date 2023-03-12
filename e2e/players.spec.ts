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

  expect(await screen.findByText(`${initiative} - ${player}`)).toHaveCount(1);
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

  await page.locator('input[value="Warrior Elf 420"]').isVisible();
});

test("sorts players based on initiative", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");

  const playerList = await page.$$("ul li");
  const players = await Promise.all(
    playerList.map(async (player) => {
      return (await player.textContent())?.trim();
    })
  );

  expect(players).toEqual([
    "18 - Barbarian Damage: 0",
    "12 - Warrior Elf 420 Damage: 0",
    "8 - Ranger Damage: 0"
  ]);
});

test("deletes a player from the list", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");

  await screen.getByLabel("Delete Warrior Elf 420").click();

  await expect(page.locator("li")).toHaveCount(0);
});

test("resets the players list", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");
  await (await screen.findByText("Reset")).click();

  await waitFor(async () => {
    const playerList = screen.queryAllByRole("listitem");

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

  expect(await screen.findByText("Round number: 1")).toHaveCount(1);
});

test("changes the active player after ending a turn", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");
  await insertPlayer(screen, "Barbarian", "10");
  await (await screen.findByText("Start battle")).click();
  await (await screen.findByText("Next turn")).click();

  expect(await screen.findByText("Round number: 1")).toHaveCount(1);
  expect(page.locator('[data-currentTurn=false]:has-text("10 - Barbarian Damage: 0")')).toHaveCount(
    1
  );
  expect(page.locator('[data-currentTurn=true]:has-text("20 - Warrior Damage: 0")')).toHaveCount(1);
});

test("goes to the next round", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior", "20");
  await insertPlayer(screen, "Barbarian", "10");
  await (await screen.findByText("Start battle")).click();
  await (await screen.findByText("Next turn")).click();
  await (await screen.findByText("Next turn")).click();

  expect(await screen.findByText("Round number: 2")).toHaveCount(1);
});

test("persists the data even on a reload", async ({ screen, page }) => {
  await page.goto("/initiative");
  await (await screen.findByText("Reset")).click();

  await insertPlayer(screen, "Warrior Elf 420", "12");
  await insertPlayer(screen, "Barbarian", "18");
  await insertPlayer(screen, "Ranger", "8");

  await page.reload();

  const playerList = await screen.findAllByRole("listitem");
  const players = await Promise.all(
    Array.from(await playerList.all()).map(async (player) => {
      return (await player.textContent())?.trim();
    })
  );

  expect(players).toEqual([
    "18 - Barbarian Damage: 0",
    "12 - Warrior Elf 420 Damage: 0",
    "8 - Ranger Damage: 0"
  ]);
});
