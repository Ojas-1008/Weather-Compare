// Import API functions for fetching weather data from both services
import { fetchFromOWM, fetchFromWeatherAPI } from "./api.js";

// Import utility functions to normalize API responses to common format
import { normalizeOWM, normalizeWeatherAPI } from "./utils.js";

// Import DOM manipulation functions and container references
import { showLoading, renderWeatherCard, renderError, owmContainer, waContainer } from "./dom.js";

// Get references to DOM elements for user interaction
// Type assertions ensure TypeScript knows these are the correct element types
const cityInput = document.getElementById("cityInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;

// Cast container elements to HTMLElement for DOM manipulation
// These are guaranteed to exist due to defensive checks in dom.ts
const owmContainerEl = owmContainer as HTMLElement;
const waContainerEl = waContainer as HTMLElement;

// Main function to handle weather search requests
// Orchestrates the entire flow: input validation, API calls, data processing, and rendering
async function handleSearch(): Promise<void> {
    // Capture and sanitize user input by trimming whitespace
    const city = cityInput.value.trim();

    // Guard clause: Prevent API calls for empty input to avoid unnecessary requests
    if (!city) {
        renderError(owmContainerEl, "Please enter a city name.");
        renderError(waContainerEl, "Please enter a city name.");
        return;
    }

    // Show loading indicators in both containers for better UX during API calls
    showLoading(owmContainerEl);
    showLoading(waContainerEl);

    try {
        // Fetch data from both APIs in parallel for better performance
        // Promise.all ensures both requests complete before proceeding
        const [owmRaw, waRaw] = await Promise.all([
            fetchFromOWM(city),
            fetchFromWeatherAPI(city)
        ]);

        // Normalize API responses to common WeatherData format for consistent rendering
        const owmData = normalizeOWM(owmRaw);
        const waData = normalizeWeatherAPI(waRaw);

        // Render weather cards for both services
        renderWeatherCard(owmContainerEl, owmData);
        renderWeatherCard(waContainerEl, waData);
    } catch (error) {
        // Handle both expected (API errors) and unexpected errors gracefully
        const message = error instanceof Error
            ? error.message
            : 'Something went wrong.';

        // Display error messages in both containers
        renderError(owmContainerEl, message);
        renderError(waContainerEl, message);
    }
}

// Set up event listener for search button clicks
searchBtn.addEventListener("click", handleSearch);

// Set up keyboard event listener for Enter key in input field
cityInput.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});