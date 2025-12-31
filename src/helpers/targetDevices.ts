import { Frame } from "playwright";
import { Device } from "../types.js";

export default async function targetDevices(
  deviceList: Device[],
  targetFrame: Frame,
  MAX_DEVICES: number = 7
) {
  for (const device of deviceList
    .sort(() => 0.5 - Math.random())
    .slice(0, MAX_DEVICES)) {
    console.log(`Adding rule for device: ${device.name}...`);

    // click New to open the form
    await targetFrame.locator("#Newbutton").click();

    // wait for the list you just pasted to be visible
    const listSelector = targetFrame.locator("#ChildrenList");
    await listSelector.waitFor({ state: "visible", timeout: 5000 });

    // we select by value (the MAC address) and then trigger the 'change' event
    await listSelector.selectOption({ value: device.mac });
    await listSelector.dispatchEvent("change");

    // fill the description
    await targetFrame.locator("#ChildrenInfo").fill(device.name);
    // select and trigger its change event too
    const template = targetFrame.locator("#TemplateList");
    await template.waitFor({ state: "visible", timeout: 10000 });

    await template.selectOption({ value: process.env.TEMPLATE_NAME || "" });
    await template.dispatchEvent("change");

    await targetFrame.locator("#ButtonApply").click({ force: true });

    // wait for the UI to return to the 'New' state before next loop
    await targetFrame.locator("#Newbutton").waitFor({ state: "visible" });
    console.log(`Rule added for device: ${device.name}`);
  }
}
