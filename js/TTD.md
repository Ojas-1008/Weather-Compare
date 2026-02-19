# TTD.md: Multi-API Weather Aggregator

## 1. Project Overview
**Project Name:** WeatherCompare  
**Objective:** A client-side web application that allows users to compare real-time weather data from two distinct public APIs side-by-side. The primary goal is to master asynchronous JavaScript by handling multiple network requests, normalizing differing JSON data structures, and robustly managing errors when one or both services fail.

**Key Learning Outcomes:**
*   Managing concurrent asynchronous operations (`Promise.all` vs. sequential `await`).
*   Normalizing disparate JSON schemas into a unified data structure.
*   Advanced error handling (handling partial success/failure).
*   Using `async/await` with `try...catch...finally` blocks.

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
*   **Language:** Vanilla JavaScript (ES6+)
    *   *Focus:* `async`, `await`, `fetch`, `try/catch/finally`.
*   **Markup:** HTML5 (Semantic HTML).
*   **Styling:** CSS3 (Flexbox/Grid for layout, CSS Variables for theming).
*   **APIs:**
    *   [OpenWeatherMap](https://openweathermap.org/api) (Free Tier).
    *   [WeatherAPI](https://www.weatherapi.com/) (Free Tier).
*   **Environment:** None required (runs directly in browser), but requires API keys to be stored in a configuration object.

---

## 4. Assets
*   **Icons:**
    *   Weather condition icons are usually provided by the APIs via URL links within the JSON response.
    *   Favicon: A simple cloud or sun vector icon (SVG).
*   **Fonts:**
    *   Primary: 'Roboto' or 'Open Sans' (Google Fonts).
    *   Monospace (for data): 'Fira Code' or 'Courier New' (for displaying raw JSON in a debug panel, optional).
*   **Placeholders:**
    *   A default "City Not Found" or "Service Down" SVG illustration.

---

## 5. Features

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

## 6. Folder Structure

```text
weather-aggregator/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styling, responsive design
├── js/
│   ├── config.js       # API Keys (Placeholder structure)
│   ├── api.js          # Logic for Fetch API calls & error handling
│   ├── utils.js        # JSON parsing helpers, normalization logic
│   ├── dom.js          # Rendering logic (updating HTML)
│   └── app.js          # Main entry point, event listeners, async control flow
└── assets/
    └── icons/          # Static SVGs for UI (loading spinners, placeholders)
```

---

## 7. Logical Flow & Diagrams

### Data Flow Sequence
1.  **Event:** User types "London" and clicks Search.
2.  **Init:**
    *   UI enters "Loading State" (DOM update).
    *   `async` function `getWeatherData(city)` is called.
3.  **Async Execution:**
    *   The function creates two Promises:
        *   `fetchOpenWeather(city)`
        *   `fetchWeatherAPI(city)`
    *   Ideally uses `Promise.allSettled([p1, p2])` to handle partial failures gracefully.
4.  **Processing (Inside `try...catch...finally`):**
    *   **Try:**
        *   Wait for responses.
        *   `response.json()` to parse raw data.
        *   Map data to unified schema: `{ temp: 15, humidity: 80, ... }`.
    *   **Catch:**
        *   Identify which promise failed.
        *   Generate specific error messages for the UI.
    *   **Finally:**
        *   Set UI to "Idle State" (remove spinners).
5.  **Render:**
    *   `dom.js` receives the normalized data (or error objects).
    *   Updates the specific card in the HTML.

### Code Logic Pseudo-structure

```javascript
// Pseudo-code for app.js logic flow

const processSearch = async (city) => {
    showLoadingSpinner();

    try {
        // Strategy: Use Promise.allSettled to handle cases where one fails
        const results = await Promise.allSettled([
            fetchOpenWeatherMap(city),
            fetchWeatherAPI(city)
        ]);

        // Logic to check results[0] and results[1] status
        // If fulfilled -> render data
        // If rejected -> render error card

        handleResults(results);
    } catch (criticalError) {
        // Handles errors not related to network (e.g., coding errors)
        showGlobalError();
    } finally {
        // Guaranteed to run
        hideLoadingSpinner();
    }
};
```