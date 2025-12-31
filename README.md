# Headless Huawei HG8145V5 Parental Control Automation (PLDT Firmware)

A headless automation suite demonstrating how to navigate legacy frameset-based router UIs (example target: Huawei HG8145V5 with PLDT firmware). This repository contains helper modules and a small automation scaffold intended for educational, research, and defensive configuration tasks — not for unauthorized access or disruption.

## Purpose

This project demonstrates techniques for interacting with complex, frameset-based web UIs using headless automation. Use it to build safe tooling for administration, testing, or research in environments you own or are explicitly authorized to test.

## Features

- Headless browser automation for frameset navigation
- Modular helpers for login, navigation, timing, and device targeting
- Example device list (for safe, offline testing)

## Prerequisites

- Node.js v16+ (or a compatible LTS)
- npm (bundled with Node.js)
- A controlled test environment (physical or virtual) — do not run against devices or networks without permission

## Quick Start

Install dependencies:

```bash
npm install
```

Install Playwright Browser Binaries (CRITICAL):

```
npx playwright install chromium
```

Run in development mode:

```bash
npm run dev
```

If your repository includes linting or tests, run them with:

```bash
npm test
# or
npm run lint
```

## Project Structure

- `src/` — Source code
  - `src/helpers/` — Helper modules: `login`, `navigateToSecurity`, `startCycle`, `targetDevices`, etc.
- `deviceLists.json` — Example device list for safe testing

## Configuration

- Use `deviceLists.json` only with harmless placeholder MACs and names when experimenting.
- Add any credentials or secrets via environment variables if you extend the project; never hard-code secrets.

## Safety & Ethics

This project is presented as a parental-control automation simulator intended only for lawful, authorized, and consensual use. It demonstrates techniques for scheduling and applying access controls to devices in a controlled environment (for example, to simulate parental-management policies in a lab or on devices you own). Do not use this code to access, disrupt, or otherwise interfere with devices or networks you do not own or have explicit permission to manage. Always obtain consent and follow applicable laws and responsible disclosure practices.

- This project is provided for educational and defensive purposes only.
- Do not use the code to access, interfere with, or disrupt devices or networks you do not own or have explicit permission to test.
- If you discover a security issue in firmware or devices, follow responsible disclosure practices.

## Contributing

- Contributions are welcome, but maintainers will refuse changes that enable misuse.
- When adding examples, keep them non-actionable and safe (read-only demonstrations, screenshots, anonymized data).

## Acknowledgements

- Inspired by the challenges of automating legacy frameset UIs.

## License

Choose a license (for example, MIT) and add a `LICENSE` file to the repository.

## Dedication

This project is dedicated to my parents — a personal reminder to channel frustration into learning and constructive projects (YES, I run this script whenever we have an argument).
