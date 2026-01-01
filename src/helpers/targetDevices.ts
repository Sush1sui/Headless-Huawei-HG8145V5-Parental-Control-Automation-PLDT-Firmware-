import { Frame } from "puppeteer";
import { Device } from "../types.js";

export default async function targetDevices(
  deviceList: Device[],
  targetFrame: Frame,
  MAX_DEVICES: number = 7
) {
  const targets = deviceList
    .sort(() => 0.5 - Math.random())
    .slice(0, MAX_DEVICES);

  for (const device of targets) {
    console.log(`Adding rule for: ${device.name}...`);

    // click new button
    await targetFrame.waitForSelector("#Newbutton", { visible: true });
    await targetFrame.click("#Newbutton");

    // wait for the new rule form to appear
    await targetFrame.waitForSelector("#ChildrenList", {
      visible: true,
      timeout: 5000,
    });

    // select the device from the dropdown
    await targetFrame.select("#ChildrenList", device.mac);

    // manually trigger the 'change' event for the router's JS
    await targetFrame.evaluate(() => {
      const el = document.querySelector("#ChildrenList") as HTMLSelectElement;
      if (el) el.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // fill description and template
    await targetFrame.type("#ChildrenInfo", device.name);
    await targetFrame.waitForSelector("#TemplateList", { visible: true });
    await targetFrame.select("#TemplateList", process.env.TEMPLATE_NAME || "");

    // apply the changes
    await Promise.all([
      targetFrame
        .waitForNavigation({ waitUntil: "networkidle2" })
        .catch(() => {}),
      targetFrame.click("#ButtonApply"),
    ]);

    console.log(`Rule added for: ${device.name}`);
  }
}
