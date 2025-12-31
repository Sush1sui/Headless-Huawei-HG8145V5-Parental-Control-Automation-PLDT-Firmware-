import { Frame } from "playwright";

export default async function clearTargets(targetFrame: Frame) {
  console.log("Cleaning the kitchen (Deleting old rules)...");

  // find all checkboxes
  const checkboxes = await targetFrame
    .locator('input[id^="PCtrMacConfigList_rml"]')
    .all();

  if (checkboxes.length === 0) {
    console.log("No existing rules to delete.");
    return;
  }

  // click every checkbox
  for (const box of checkboxes) {
    await box.check();
  }

  // click the Delete button you identified
  await targetFrame.locator("#DeleteButton").click();

  console.log("Old rules deleted.");

  // wait for the UI to refresh
  await targetFrame.waitForLoadState("networkidle");
}
