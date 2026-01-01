import { Page } from "puppeteer";

export default async function login(
  page: Page,
  username: string,
  password: string
) {
  await page.type("#txt_UserName", username);
  await page.type("#txt_Password", password);
  await page.click("#button");

  // Wait for the URL to change to the internal dashboard
  await page.waitForNavigation({
    waitUntil: "domcontentloaded",
    timeout: 10000,
  });
  console.log("Login successful.");
}
