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

  expect(await screen.findByText("Total: 133 platinum | 5 gold | 1 silver | 5 copper"));
});
