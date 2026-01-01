# WiFi Russian Roulette 🎲

An automated parental control system for Huawei HG8145V5 routers (PLDT firmware) that randomly selects and applies access restrictions to devices on your network. Runs on a 10-minute interval to keep everyone guessing.

## What It Does

This automation tool:

- Logs into your Huawei router admin panel
- Navigates to the parental control/security settings
- Randomly selects up to 7 devices from your configured device list
- Applies a specified access template (time restrictions) to those devices
- Repeats every 10 minutes, shuffling which devices get restricted

## Features

- **Puppeteer-based automation** for reliable router UI interaction
- **Random device selection** from your device list
- **Automatic retry logic** with configurable intervals
- **Environment-based configuration** for security
- **Modular helper functions** for maintainability
- **TypeScript** for type safety

## Prerequisites

- **Bun** (recommended) or Node.js v18+
- A Huawei HG8145V5 router with PLDT firmware
- Admin access to your router
- Windows, macOS, or Linux

## Quick Start

### 1. Install Bun (if not already installed)

```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

# macOS/Linux
curl -fsSL https://bun.sh/install | bash
```

### 2. Install Dependencies

```bash
bun install
```

This automatically installs Puppeteer's Chromium binary via the `postinstall` script.

### 3. Configure Environment

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your router credentials:

```env
ROUTER_HOST=192.168.1.1
ROUTER_USER=adminpldt
ROUTER_PASS=your_router_password
TEMPLATE_NAME="Internet access 5am - 8pm"
```

**Note:** The `TEMPLATE_NAME` must exactly match a parental control template you've already created in your router's UI.

### 4. Configure Device List

Create `src/deviceLists.json` based on the example:

```bash
cp src/deviceLists.example.json src/deviceLists.json
```

Edit `src/deviceLists.json` with your devices' MAC addresses and names:

```json
[
  {
    "name": "Galaxy Note 20 Ultra",
    "mac": "AA:BB:CC:DD:EE:FF"
  },
  {
    "name": "POCO X7 PRO",
    "mac": "11:22:33:44:55:66"
  }
]
```

### 5. Run the Automation

```bash
bun dev
```

The script will:

1. Launch a Chromium browser (non-headless by default, so you can watch)
2. Log into your router
3. Apply random restrictions every 10 minutes

## Project Structure

```
yall-are-cooked/
├── src/
│   ├── index.ts                    # Main entry point, runs the cycle every 10 minutes
│   ├── types.ts                    # TypeScript interfaces
│   ├── deviceLists.json            # Your device list (not tracked in git)
│   ├── deviceLists.example.json    # Example device list template
│   └── helpers/
│       ├── startCycle.ts           # Main automation orchestrator
│       ├── login.ts                # Router login handler
│       ├── navigateToSecurity.ts   # Navigate to parental control section
│       ├── targetDevices.ts        # Apply restrictions to random devices
│       ├── clearTargets.ts         # Clear existing restrictions
│       └── waitInSeconds.ts        # Utility delay function
├── .env                            # Your router credentials (not tracked in git)
├── .env.example                    # Example environment template
├── package.json                    # Project metadata and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Configuration

### Environment Variables (`.env`)

| Variable        | Description                                      | Example                       |
| --------------- | ------------------------------------------------ | ----------------------------- |
| `ROUTER_HOST`   | Router IP address                                | `192.168.1.1`                 |
| `ROUTER_USER`   | Router admin username                            | `adminpldt`                   |
| `ROUTER_PASS`   | Router admin password                            | `your_password`               |
| `TEMPLATE_NAME` | Name of pre-configured parental control template | `"Internet access 5am - 8pm"` |

### Device List (`src/deviceLists.json`)

Each device entry requires:

- `name`: Human-readable device name
- `mac`: MAC address (format: `AA:BB:CC:DD:EE:FF`)

### Customization

Edit [src/index.ts](src/index.ts) to change the refresh interval (default: 10 minutes):

```typescript
const REFRESH_INTERVAL = 10 * 60 * 1000; // milliseconds
```

Edit [src/helpers/targetDevices.ts](src/helpers/targetDevices.ts) to change max devices per cycle (default: 7):

```typescript
await targetDevices(deviceList, targetFrame, 7); // last parameter
```

## Troubleshooting

### Browser Hangs on Launch (Bun on Windows)

If the browser hangs when launching with Bun, this is typically due to Puppeteer/Chromium compatibility issues. The current configuration includes Windows-specific fixes:

```typescript
args: [
  "--disable-dev-shm-usage", // Prevents shared memory issues
  "--remote-debugging-port=9222", // Forces stable connection pipe
];
```

### Router Connection Issues

- Verify your router IP is correct in `.env`
- Ensure you can manually access `https://YOUR_ROUTER_IP/admin.html`
- Check that your admin credentials are correct
- Make sure your template name exactly matches one in your router settings

### Device Not Found

- Verify MAC addresses are correct in `deviceLists.json`
- Ensure devices are connected to the router
- Check that the MAC address format matches your router's format

## How It Works

1. **Initialization**: Launches Puppeteer browser and navigates to router admin panel
2. **Authentication**: Logs in using credentials from `.env`
3. **Navigation**: Navigates through frameset-based UI to parental control section
4. **Clear**: Removes any existing restrictions
5. **Random Selection**: Picks up to 7 random devices from your list
6. **Apply**: Applies the specified template to each selected device
7. **Repeat**: Waits 10 minutes and runs again

## Running with Node.js

While Bun is recommended, you can also use Node.js:

```bash
npm install
npm run dev
```

## Safety & Ethics

This project is designed for use **only on networks and devices you own or have explicit permission to manage**. It's a personal automation tool for parental control and network management.

**Intended use cases:**

- Parents managing their children's device access
- Network administrators testing parental control policies
- Personal network management in your own home

**Not intended for:**

- Unauthorized access to networks or devices
- Interfering with networks you don't own
- Malicious disruption of services

Always ensure you have proper authorization before running this tool.

## Contributing

Contributions are welcome! Please ensure any changes:

- Maintain the educational/legitimate use focus
- Include proper error handling
- Follow existing code style
- Update documentation as needed

## License

ISC License - See [LICENSE](LICENSE) for details

## Author

**Sush1sui** - Because sometimes you gotta channel that parental frustration into something productive 😅

## Dedication

This project is dedicated to my parents — a personal reminder to channel frustration into learning and constructive projects (YES, I run this script whenever we have an argument).
