// Interface for OpenWeatherMap API response
export interface OWMApiResponse {
    name: string; // City name
    main: {
        temp: number; // Temperature in Celsius
        humidity: number; // Humidity percentage
    };
    weather: Array<{ // Array of weather conditions
        description: string; // Weather description
        icon: string; // Icon code for weather
    }>;
    wind: {
        speed: number; // Wind speed in m/s
    };
    dt: number; // Timestamp of data
}

// Interface for WeatherAPI response
export interface WAApiResponse {
    location: {
        name: string; // City name
        localtime: string; // Local time
    };
    current: {
        temp_c: number; // Temperature in Celsius
        humidity: number; // Humidity percentage
        wind_kph: number; // Wind speed in km/h
        condition: {
            text: string; // Weather description
            icon: string; // Icon URL
        };
    };
}

// Unified weather data interface
export interface WeatherData {
    city: string; // City name
    tempC: number; // Temperature in Celsius
    description: string; // Weather description
    humidity: number; // Humidity percentage
    windKph: number; // Wind speed in km/h
    iconUrl: string; // Icon URL
    lastUpdated: string; // Last update timestamp
}

// Card state type for UI components
export type CardState = 'idle' | 'loading' | 'success' | 'error';