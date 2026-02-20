# TTD.md: Multi-API Weather Aggregator (TypeScript Version)

## 1. Project Overview
**Project Name:** WeatherCompare (TS Edition)  
**Objective:** A client-side web application that allows users to compare real-time weather data from two distinct public APIs side-by-side. The primary goal is to master asynchronous logic and **Type Safety** by handling multiple network requests, normalizing differing JSON data structures using **Interfaces**, and robustly managing errors.

**Key Learning Outcomes (TypeScript Focus):**
*   **Interfaces & Types:** Defining the "shape" of API responses and normalized data.
*   **Type Casting & Assertions:** Safely handling `fetch` responses.
*   **Managing concurrent asynchronous operations** (`Promise.all` vs. sequential `await`).
*   **Normalizing disparate JSON schemas** into a unified interface.
*   **Advanced error handling** with specific error types.

---

## 2. Visuals

### Frontend UI Description
*   **Header:** Application title and a prominent search bar (Input: City Name).
*   **Main Content Area:** A split-card layout.
    *   **Card 1 (Left):** Data from OpenWeatherMap.
    *   **Card 2 (Right):** Data from WeatherAPI (or similar).
    *   **Card Content:** City Name, Temperature, Weather Icon, Humidity, Wind Speed, "Last Updated" timestamp.
*   **State Indicators:**
    *   **Loading State:** Skeleton loaders or spinning icons inside the cards while fetching.
    *   **Error State:** If one API fails, the card displays a "Service Unavailable" message while the other card remains functional.
*   **Footer:** A simple "Clear History" button and attribution links to the APIs.

### Backend (API) Behavior Description
*   **Endpoints:**
    *   `GET https://api.openweathermap.org/data/2.5/weather` (Returns JSON with metric units).
    *   `GET https://api.weatherapi.com/v1/current.json` (Returns JSON with metric units).
*   **Data Normalization Logic:**
    *   The application must map different JSON key paths to a standard interface.
    *   *Example:* API A stores temp in `main.temp`, API B stores temp in `current.temp_c`. The UI should display them identically.

---

## 3. Tech Stack
*   **Language:** Vanilla TypeScript
    *   *Focus:* **Interfaces**, **Strict Typing**, `async`, `await`, `fetch`.
*   **Markup:** HTML5 (Semantic HTML).
*   **Styling:** CSS3 (Flexbox/Grid, CSS Variables).
*   **APIs:**
    *   [OpenWeatherMap](https://openweathermap.org/api)
    *   [WeatherAPI](https://www.weatherapi.com/)
*   **Environment:** Node.js + `tsc` (TypeScript Compiler) or Vite for modern development.

---

## 4. TypeScript Core Concepts for this project
For a first-time TS user, we will focus on these three pillars:
1.  **Interfaces:** Creating a "contract" for what a Weather object looks like.
    ```typescript
    interface WeatherData {
        city: string;
        temp: number;
        description: string;
        humidity: number;
        iconUrl: string;
    }
    ```
2.  **API Response Interfaces:** Defining the exact structure of the JSON returned by different APIs so we get auto-completion and catch errors before we even run the code.
3.  **Union Types for Error Handling:** Using types like `string | null` to handle missing data.

---

## 5. Folder Structure (Refined for TS)

```text
weather-aggregator/
├── index.html          # Entry point (links to /dist/app.js)
├── css/
│   └── styles.css
├── src/                # All TypeScript source files
│   ├── types.ts        # Shared Interfaces & Types
│   ├── config.ts       # API Keys
│   ├── api.ts          # API calling logic
│   ├── utils.ts        # Normalization helpers
│   ├── dom.ts          # DOM manipulation
│   └── app.ts          # Main orchestrator
├── dist/               # Compiled JavaScript (generated automatically)
├── tsconfig.json       # TypeScript compiler settings
└── package.json        # Script to run/build the project
```

### MVP (Must Have)
1.  **Dual API Fetch:** User inputs a city; the app fetches data from both APIs simultaneously.
2.  **Concurrent Loading:** Both requests trigger at the same time (efficient async management).
3.  **JSON Normalization:** Parsing both API responses and rendering them cleanly to the DOM.
4.  **Robust Error Handling:**
    *   If City is invalid: Both cards show "City not found".
    *   If one API fails (Network Error/Timeout): The successful API displays data, the failed card shows an error message.
    *   `finally` block implementation to remove loading spinners regardless of success/failure.
5.  **Visual Loading States:** UI indicates when data is being fetched.

### Stretch Goals (Nice to Have)
1.  **Search History (Callback Integration):**
    *   Store previous searches in `localStorage` (using `JSON.stringify`).
    *   Clicking a history item triggers the fetch logic via a callback function.
2.  **Debug Mode:** A toggle button to show the raw JSON response from both APIs in a `<pre>` block (great for practicing `JSON.parse` logic).
3.  **Unit Toggle:** Switch between Celsius and Fahrenheit (requires re-fetching or client-side conversion logic).
4.  **Performance Optimization:** Implement `Promise.allSettled` to ensure the UI updates even if one promise rejects, rather than using individual try/catch blocks sequentially.

---

## 7. Features (Stretch Goals)
1.  **Search History:** Store previous searches in `localStorage`.
2.  **Debug Mode:** A toggle button to show the raw JSON response.
3.  **Performance Optimization:** Use `Promise.allSettled` to ensure the UI updates even if one promise rejects.

---

## 8. Logical Flow & Diagrams (TypeScript Enhanced)

### Data Flow Sequence
1.  **Event:** User types "London" and clicks Search.
2.  **Init:**
    *   UI enters "Loading State".
    *   `async` function `getWeatherData(city: string)` is called.
3.  **Async Execution:**
    *   Calls `fetchOpenWeather(city)` and `fetchWeatherAPI(city)`.
    *   Returns `Promise<WeatherData>`.
4.  **Processing:**
    *   Use `Promise.allSettled` to get `PromiseSettledResult<WeatherData>[]`.
    *   Use **Type Guards** to check if the result is `fulfilled`.
5.  **Render:**
    *   Pass the `WeatherData` object to `dom.ts`.

### TypeScript Code Logic Preview

```typescript
import { WeatherData } from './types';

const processSearch = async (city: string): Promise<void> => {
    dom.showLoading();

    try {
        const results = await Promise.allSettled([
            fetchFromSourceA(city),
            fetchFromSourceB(city)
        ]);

        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                dom.renderCard(result.value, index);
            } else {
                dom.renderError(result.reason, index);
            }
        });
    } finally {
        dom.hideLoading();
    }
};
```