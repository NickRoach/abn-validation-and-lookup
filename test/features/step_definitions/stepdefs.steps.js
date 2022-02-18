const playwright = require('@playwright/test');
const cucumber = require("@cucumber/cucumber");

cucumber.When('User enters a valid ABN', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.type('[name=ABNField]', '41 161 080 146')
});

cucumber.Then('The entity name associated with that ABN will be displayed', async ({ page }) => {
    const textOutput = page.locator('[name="textOutput"]')
    await playwright.expect(textOutput).toHaveText('ABN is valid and belongs to GOSOURCE PTY. LTD.');
});