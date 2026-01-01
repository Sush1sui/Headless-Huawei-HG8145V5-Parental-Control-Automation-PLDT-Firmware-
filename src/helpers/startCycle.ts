import puppeteer from 'puppeteer';
import deviceList from '../deviceLists.json' with { type: 'json' };
import login from './login.js';
import waitInSeconds from './waitInSeconds.js';
import navigateToSecurity from './navigateToSecurity.js';
import targetDevices from './targetDevices.js';
import clearTargets from './clearTargets.js';


export default async function startCycle() {
  // launch headed browser so you can see actions (set headless: false)
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: undefined,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--ignore-certificate-errors',
      '--no-zygote',
      '--disable-dev-shm-usage', // Vital for Windows memory stability
      '--remote-debugging-port=9222' // Forces a stable connection pipe
    ],
    dumpio: true
  })

  await waitInSeconds(3)

  try {
    console.log(`[${new Date().toLocaleTimeString()}] Accessing router at ${process.env.ROUTER_HOST}...`);

    const page = await browser.newPage()

    await page.goto(`https://${process.env.ROUTER_HOST}/admin.html`, { waitUntil: 'networkidle2' });

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
    await waitInSeconds(5)

    try { // try catch to swallow the Bun/Windows cleanup errors
      await browser.close();
    } catch (e) {
      // ignore cleanup errors since the work is already done
    }
  }
}