# ⛅ WeatherCompare

A client-side web application built with **TypeScript** that lets you compare real-time weather data from two independent APIs side-by-side: [OpenWeatherMap](https://openweathermap.org/api) and [WeatherAPI](https://www.weatherapi.com/).

---

## ✨ Features

- **Dual API fetch** — Retrieves live weather data from two sources simultaneously for any city.
- **Side-by-side comparison** — Displays both results in matching cards so differences are immediately visible.
- **Concurrent requests** — Uses `Promise.all` so both API calls fire at the same time.
- **Unified data model** — Normalizes the differing JSON schemas from each API into a single `WeatherData` interface before rendering.
- **Loading states** — Animated spinner shown inside each card while data is being fetched.
- **Error handling** — If a city is not found, or an API call fails, the affected card shows a clear error message while the other card remains functional.
- **Keyboard support** — Press **Enter** in the search box to trigger a search.
- **Search history** — Previous searches are stored in `localStorage` and can be cleared via the footer button.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5 (strict mode) |
| Markup | HTML5 |
| Styling | CSS3 (Flexbox / CSS Variables) |
| Fonts & Animation | Google Fonts · Animate.css |
| APIs | OpenWeatherMap · WeatherAPI |
| Build tool | `tsc` (TypeScript Compiler) |
| Runtime | Browser (ES Modules) |

---

## 📁 Project Structure

```
weather-compare/
├── index.html          # App entry point (loads /dist/app.js)
├── css/
│   └── styles.css      # All styling
├── src/                # TypeScript source files
│   ├── types.ts        # Shared interfaces & types
│   ├── config.ts       # API base URLs and keys (git-ignored)
│   ├── api.ts          # Fetch logic for each API
│   ├── utils.ts        # Response normalizers (OWM → WeatherData, WA → WeatherData)
│   ├── dom.ts          # DOM helpers (showLoading, renderWeatherCard, renderError)
│   └── app.ts          # Main orchestrator (event listeners, search flow)
├── dist/               # Compiled JavaScript output (auto-generated, git-ignored)
├── tsconfig.json       # TypeScript compiler configuration
└── package.json        # npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- API keys for:
  - [OpenWeatherMap](https://home.openweathermap.org/users/sign_up) — free tier is sufficient
  - [WeatherAPI](https://www.weatherapi.com/signup.aspx) — free tier is sufficient

### 1. Install dependencies

```bash
npm install
```

### 2. Configure API keys

Create the file `src/config.ts` (it is git-ignored to keep your keys private):

```typescript
export const CONFIG = {
    OWM: {
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
        API_KEY: "YOUR_OPENWEATHERMAP_KEY",
    },
    WEATHERAPI: {
        BASE_URL: "https://api.weatherapi.com/v1/current.json",
        API_KEY: "YOUR_WEATHERAPI_KEY",
    },
};
```

### 3. Build the TypeScript

```bash
npm run build
```

This compiles all files in `src/` to `dist/`.

For automatic recompilation on save:

```bash
npm run watch
```

### 4. Open in the browser

Open `index.html` directly in your browser, or serve it with any static server, for example:

```bash
npx serve .
```

---

## 🔄 How It Works

1. The user types a city name and clicks **Search** (or presses Enter).
2. `app.ts` calls `fetchFromOWM` and `fetchFromWeatherAPI` in parallel via `Promise.all`.
3. Both raw API responses are passed through their respective normalizers in `utils.ts`, which map the differing JSON structures to the common `WeatherData` interface.
4. `dom.ts` renders the normalized data into the two weather cards.
5. If either call fails (network error, invalid city, etc.), the error message is shown in the corresponding card.

### `WeatherData` interface

```typescript
interface WeatherData {
    city: string;
    tempC: number;        // °C
    description: string;
    humidity: number;     // %
    windKph: number;      // km/h
    iconUrl: string;
    lastUpdated: string;
}
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run build` | Compile TypeScript once |
| `npm run watch` | Compile TypeScript in watch mode |
| `npm test` | Compile and run `dist/test.js` |

---

## 🙏 Attribution

Weather data provided by [OpenWeatherMap](https://openweathermap.org/) and [WeatherAPI](https://www.weatherapi.com/).
