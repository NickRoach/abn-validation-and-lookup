import { test, expect } from '@playwright/test';

test.use({headless: true,
    launchOptions: {
        slowMo: 0
    }
});

function delay(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

test('correctly identifies an invalid ABN', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.type('[name=ABNField]', '41 161 080 147')
    const textOutput = page.locator('[name="textOutput"]')
    await expect(textOutput).toHaveText('ABN is not valid');
});

test('correctly identifies a valid ABN', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.type('[name=ABNField]', '41 161 080 146')
    const textOutput = page.locator('[name="textOutput"]')
    await expect(textOutput).toHaveText(/ABN is valid and belongs to */);
});

test('correctly identifies and looks up a valid ABN', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.type('[name=ABNField]', '41 161 080 146')
    const textOutput = page.locator('[name="textOutput"]')
    await expect(textOutput).toHaveText('ABN is valid and belongs to GOSOURCE PTY. LTD.');
});

test('correctly identifies when the user modifies the entity name', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.type('[name=ABNField]', '41 161 080 146');
    const textOutput = page.locator('[name="entityName"]');
    await textOutput.type('abc');
    const isModified = page.locator('[name="isModified"]');
    await expect(isModified).toHaveText('Was modified: true');
});