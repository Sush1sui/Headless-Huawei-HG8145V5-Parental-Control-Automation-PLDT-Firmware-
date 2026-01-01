import startCycle from "./helpers/startCycle.js";

const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes

// initial run
await startCycle();

// set interval for subsequent runs
setInterval(startCycle, REFRESH_INTERVAL);
