import { Frame } from "puppeteer";

export default async function clearTargets(targetFrame: Frame) {
  console.log("Cleaning the kitchen (Deleting old rules)...");

  // find all checkboxes
  const checkboxes = await targetFrame.$$('input[id^="PCtrMacConfigList_rml"]');

  if (checkboxes.length === 0) {
    console.log("No existing rules to delete.");
    return;
  }

  // click every checkbox
  for (const box of checkboxes) {
    await box.evaluate((el: any) => {
      if (!el.checked) el.click();
    });
  }

  // click the Delete button you identified
  await targetFrame.locator("#DeleteButton").click();

  console.log("Old rules deleted.");

  // wait for the UI to refresh
  await targetFrame.waitForNavigation({ waitUntil: "networkidle2" });
}
