import { Page } from "playwright";

export default async function login(
  page: Page,
  username: string,
  password: string
) {
  await page.fill("#txt_Username", username);
  await page.fill("#txt_Password", password);
  await page.click("#button");

  // Wait for the URL to change to the internal dashboard
  await page.waitForURL("**/index.asp", { timeout: 10000 });
  console.log("Login successful.");
}
