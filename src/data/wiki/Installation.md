# Installation

## Download

The latest release is available on the [Releases page](https://github.com/sreegjl/timelines/releases). Download the installer for your platform and run it.

Timelines is currently in early alpha. Expect rough edges.

## Building from Source

**Prerequisites:** [Node.js LTS](https://nodejs.org/)

**1. Clone the repo**
```bash
git clone https://github.com/sreegjl/timelines.git
cd timelines
```

**2. Install dependencies**
```bash
npm install
```

**3. Build the installer**
```bash
npm run electron:build
```

The output installer will be in the `release/` folder.

## Running in Development Mode

```bash
npm run electron:dev
```

## Data Storage

Timelines are stored as `.timeline` JSON files and notes as `.md` files. By default these are saved to your system app data folder. You can point to a custom directory in app settings.
