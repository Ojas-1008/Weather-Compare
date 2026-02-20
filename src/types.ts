// Unified data structure for the UI
export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
    lastUpdated: string;
}

// Example interface for OpenWeatherMap response
export interface OpenWeatherResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        description: string;
        icon: string;
    }>;
    name: string;
    dt: number;
    wind: {
        speed: number;
    };
}

// Example interface for WeatherAPI response
export interface WeatherAPIResponse {
    location: {
        name: string;
    };
    current: {
        temp_c: number;
        humidity: number;
        wind_kph: number;
        condition: {
            text: string;
            icon: string;
        };
        last_updated: string;
    };
}
