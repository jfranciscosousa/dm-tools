import {
  locatorFixtures as fixtures,
  LocatorFixtures as TestingLibraryFixtures
} from "@playwright-testing-library/test/fixture.js";
import { test as base } from "@playwright/test";

const test = base.extend<TestingLibraryFixtures>(fixtures);

const { expect } = test;

test("enters a player into the initiative list", async ({ screen, page }) => {
  await page.goto("/gold");

  await page.getByLabel("Copper").fill("115");
  await page.getByLabel("Silver").fill("115");
  await page.getByLabel("Gold").fill("115");
  await page.getByLabel("Electrum").fill("115");
  await page.getByLabel("Platinum").fill("115");

  // Values are displayed as individual stats in a grid
  expect(await screen.findByText("133")).toHaveCount(1); // platinum
  expect(await screen.findByText("133515")).toHaveCount(1); // total in copper
});
