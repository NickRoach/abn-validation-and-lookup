import { expect } from '@playwright/test';
const { Given, Then } = require("cucumber");

Given('User enteres a valid ABN', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.type('[name=ABNField]', '41 161 080 146')
});

Then('The entity name associated with that ABN will be displayed', async ({ page }) => {
    const textOutput = page.locator('[name="textOutput"]')
    await expect(textOutput).toHaveText('ABN is valid and belongs to GOSOURCE PTY. LTD.');
});