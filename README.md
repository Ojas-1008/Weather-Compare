# ⛅ WeatherCompare

A client-side web application that lets you compare **real-time weather data** from two independent sources — [OpenWeatherMap](https://openweathermap.org/api) and [WeatherAPI](https://www.weatherapi.com/) — side-by-side in a clean, animated UI.

Built with **Vanilla TypeScript**, it demonstrates concurrent async data fetching, JSON normalization across different API schemas, and robust error handling.

---

## ✨ Features

- 🔍 **Dual API Fetch** – Search any city and instantly retrieve data from both APIs simultaneously using `Promise.all`.
- 🔄 **JSON Normalization** – Different API response structures are mapped to a single `WeatherData` interface for consistent rendering.
- ⚡ **Concurrent Requests** – Both API calls fire in parallel for the best possible performance.
- 🛡️ **Robust Error Handling** – If one API fails, the other card still displays its data; invalid cities show a clear error message in both cards.
- 🕐 **Loading States** – Animated spinners appear in each card while data is being fetched.
- 📜 **Search History** – Previous searches are stored in `localStorage` and can be re-triggered with a single click.
- 🗑️ **Clear History** – A footer button lets you wipe the search history at any time.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5 (strict mode) |
| Markup | HTML5 (semantic) |
| Styling | CSS3 (Flexbox / Grid, CSS variables) |
| Fonts | Google Fonts – Poppins & Roboto |
| Animations | Animate.css |
| Runtime | Browser (ES modules via compiled `dist/`) |
| Build Tool | TypeScript Compiler (`tsc`) |

---

## 📁 Folder Structure

```text
Weather-Compare/
├── index.html          # Entry point — links to /dist/app.js
├── css/
│   └── styles.css      # All application styles
├── src/                # TypeScript source files
│   ├── types.ts        # Shared interfaces & types (WeatherData, OWMApiResponse, …)
│   ├── config.ts       # API base URLs and keys
│   ├── api.ts          # fetch wrappers for each API
│   ├── utils.ts        # Response normalizers (OWM → WeatherData, WA → WeatherData)
│   ├── dom.ts          # DOM helpers: showLoading, renderWeatherCard, renderError
│   └── app.ts          # Main orchestrator — wires up events and async flow
├── dist/               # Compiled JavaScript (auto-generated, do not edit)
├── tsconfig.json       # TypeScript compiler settings
└── package.json        # npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- API keys from:
  - [OpenWeatherMap](https://home.openweathermap.org/api_keys) (free tier)
  - [WeatherAPI](https://www.weatherapi.com/my/) (free tier)

### 1. Install dependencies

```bash
npm install
```

### 2. Add your API keys

Open `src/config.ts` and replace the placeholder values with your own keys:

```typescript
export const CONFIG = {
    OWM: {
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
        API_KEY: "YOUR_OPENWEATHERMAP_API_KEY",
    },
    WEATHERAPI: {
        BASE_URL: "https://api.weatherapi.com/v1/current.json",
        API_KEY: "YOUR_WEATHERAPI_KEY",
    },
};
```

> ⚠️ **Never commit real API keys to version control.** Use environment variables or a `.env` file (excluded via `.gitignore`) for production use.

### 3. Build

```bash
npm run build
```

This compiles all TypeScript in `src/` to `dist/`.

For continuous compilation during development:

```bash
npm run watch
```

### 4. Open in browser

Open `index.html` directly in your browser, or serve the project root with any static file server, for example:

```bash
npx serve .
```

---

## 🔄 How It Works

1. User types a city name and presses **Search** (or hits **Enter**).
2. Both weather-card containers enter a *loading* state.
3. `app.ts` calls `fetchFromOWM` and `fetchFromWeatherAPI` **in parallel** via `Promise.all`.
4. Raw API responses are passed through their respective normalizers (`normalizeOWM` / `normalizeWeatherAPI`) to produce a unified `WeatherData` object.
5. Each card is rendered with the city name, temperature, weather icon, humidity, wind speed, and last-updated timestamp.
6. If either request throws, the error message is shown in the affected card(s).
7. The search term is appended to the `localStorage` history for quick re-use.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run watch` | Watch for changes and recompile automatically |
| `npm test` | Compile and run `dist/test.js` |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
