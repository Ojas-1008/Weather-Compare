import { OWMApiResponse, WAApiResponse } from './types';
import { CONFIG } from './config';

// Fetch weather data from OpenWeatherMap API
export async function fetchFromOWM(city: string): Promise<OWMApiResponse> {
    // Build API URL with city and API key
    const url = `${CONFIG.OWM.BASE_URL}?q=${city}&appid=${CONFIG.OWM.API_KEY}&units=metric`;

    // Send fetch request to API
    const response = await fetch(url);

    // Handle API errors
    if (!response.ok) {
        throw new Error(`OWM request failed with status ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json() as OWMApiResponse;
    return data;
}

// Fetch weather data from WeatherAPI
export async function fetchFromWeatherAPI(city: string): Promise<WAApiResponse> {
    // Build API URL with city and API key
    const url = `${CONFIG.WEATHERAPI.BASE_URL}?key=${CONFIG.WEATHERAPI.API_KEY}&q=${city}`;

    // Send fetch request to API
    const response = await fetch(url);

    // Handle API errors
    if (!response.ok) {
        throw new Error(`WeatherAPI request failed with status ${response.status}`);
    }

    // Parse JSON response
    const data = await response.json() as WAApiResponse;
    return data;
}