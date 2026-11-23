const { test, expect } = require("@playwright/test");

test("BOOT läuft durch: 11 Treffer, 3 daneben, 7 offen", async ({ page }) => {
  await page.goto("/?fast=1");
  await page.getByTestId("boot-btn").click();
  await expect(page.getByTestId("stat-treffer")).toHaveText("11");
  await expect(page.getByTestId("stat-daneben")).toHaveText("3");
  await expect(page.getByTestId("stat-offen")).toHaveText("7");
  await expect(page.getByTestId("output")).toContainText("TARGETEER");
  await expect(page.getByTestId("boot-btn")).toBeEnabled();
});

test("HALT stoppt den Lauf", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("boot-btn").click();
  await page.getByTestId("halt-btn").click();
  await expect(page.getByTestId("halt-btn")).toBeDisabled();
  await expect(page.getByTestId("output")).toContainText("HALT");
  await expect(page.getByTestId("stat-treffer")).not.toHaveText("11");
});

test("Fehlerliste zeigt korrigierte DANEBEN aus Batch 2", async ({ page }) => {
  await page.goto("/?fast=1");
  await page.getByTestId("boot-btn").click();
  await expect(page.getByTestId("errors")).toContainText("PY 8 — DANEBEN → TARGETEER → TREFFER");
});

test("729-Testkarte: alle 5 Prüfungen ✓", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("card729").locator(".ok")).toHaveCount(5);
});

test("Theme-Umschalter wechselt dark/light", async ({ page }) => {
  await page.goto("/");
  const before = await page.locator("html").getAttribute("data-theme");
  await page.getByTestId("theme-btn").click();
  await expect(page.locator("html")).not.toHaveAttribute("data-theme", before);
});
