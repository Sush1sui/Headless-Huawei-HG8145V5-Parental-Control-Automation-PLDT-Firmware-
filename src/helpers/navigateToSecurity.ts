import { Page } from "puppeteer";
import waitInSeconds from "./waitInSeconds.js";

export default async function navigateToSecurity(page: Page) {
  console.log("Clicking Security Tab...");
  await page.click('div[name="maindiv_firewalllevel"]');

  // wait for the network to settle so the frames can load
  await page.waitForNetworkIdle();

  // instead of naming the frame, we find the one that actually HAS the button
  const frames = page.frames();
  let targetFrame = null;

  for (const frame of frames) {
    const hasLink = await frame.$('div[name="subdiv_parentalctrlstatus"]');
    if (hasLink) {
      targetFrame = frame;
      break;
    }
  }

  if (!targetFrame)
    throw new Error("Could not find the sidebar frame. Is the router slow?");

  await waitInSeconds(3); // give some extra time for the frame to be fully interactive

  console.log("Opening Parental Control Configuration...");
  await targetFrame.click('div[name="subdiv_parentalctrlstatus"]');

  // wait for the main configuration frame to load
  await page.waitForNetworkIdle();

  // find and return the frame containing the 'New' button
  for (const frame of page.frames()) {
    const hasNewBtn = await frame.$("#Newbutton");
    if (hasNewBtn) return frame;
  }

  throw new Error("Could not find the configuration (main) frame.");
}
