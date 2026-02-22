import { WeatherData } from './types.js';

// Get references to the HTML containers for displaying weather data from different APIs
// Using non-null assertion since we check for their existence below
const owmContainer = document.getElementById("openweather-content");
const waContainer = document.getElementById("weatherapi-content");

// Defensive programming: Ensure required DOM elements exist before proceeding
if (!owmContainer || !waContainer) {
    throw new Error("Required HTML elements 'openweather-content' and 'weatherapi-content' not found");
}

// Display a loading spinner in the specified container
export function showLoading(container: HTMLElement): void {
    container.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
}

// Render a weather data card with formatted information
export function renderWeatherCard(container: HTMLElement, data: WeatherData): void {
    container.innerHTML = `
        <div class="weather-data">
            <div class="city-name">${data.city}</div>
            <img src="${data.iconUrl}" alt="${data.description}" width="64" height="64" />
            <div class="weather-data-item">
                <span class="data-label">🌡️ Temperature</span>
                <span class="data-value temp-large">${data.tempC}°C</span>
            </div>
            <div class="weather-data-item">
                <span class="data-label">🌤️ Condition</span>
                <span class="data-value">${data.description}</span>
            </div>
            <div class="weather-data-item">
                <span class="data-label">💧 Humidity</span>
                <span class="data-value">${data.humidity}%</span>
            </div>
            <div class="weather-data-item">
                <span class="data-label">💨 Wind</span>
                <span class="data-value">${data.windKph} kph</span>
            </div>
            <div class="weather-data-item">
                <span class="data-label">🕒 Updated</span>
                <span class="data-value">${data.lastUpdated}</span>
            </div>
        </div>
    `;
}

// Display an error message in the specified container
export function renderError(container: HTMLElement, message: string): void {
    container.innerHTML = `
        <div class="error-message">
            <p>⚠️ ${message}</p>
        </div>
    `;
}

// Export the container references for use in other modules
export { owmContainer, waContainer };