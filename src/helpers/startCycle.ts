import 'dotenv/config';
import { chromium } from 'playwright';
import deviceList from '../deviceLists.json' with { type: 'json' };
import login from './login.js';
import waitInSeconds from './waitInSeconds.js';
import navigateToSecurity from './navigateToSecurity.js';
import targetDevices from './targetDevices.js';
import clearTargets from './clearTargets.js';


export default async function startCycle() {
  // launch headed browser so you can see actions (set headless: false)
  const browser = await chromium.launch({
    headless: true,
    slowMo: 50,
    args: ['--disable-gpu', '--no-sandbox', '--start-maximized'],
  })


  try {
    console.log(`[${new Date().toLocaleTimeString()}] Accessing router at ${process.env.ROUTER_HOST}...`);

    // create context that ignores SSL errors
    const context = await browser.newContext({
      ignoreHTTPSErrors: true,
    })

    const page = await context.newPage()

    await page.goto(`https://${process.env.ROUTER_HOST}/admin.html`, { waitUntil: 'networkidle' });

    // login
    await login(
      page,
      process.env.ROUTER_USER || '',
      process.env.ROUTER_PASS || '',
    )

    await waitInSeconds(2)

    const targetFrame = await navigateToSecurity(page);

    await clearTargets(targetFrame);

    await targetDevices(deviceList, targetFrame, 7);

    console.log("Injection complete")
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
}