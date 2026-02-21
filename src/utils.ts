import { OWMApiResponse, WAApiResponse, WeatherData } from "./types";

function formatUnixTimestamp(unix: number): string {
    return new Date(unix * 1000).toLocaleString("en-IN", {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function normalizeOWM(raw: OWMApiResponse): WeatherData {
    return {
        city: raw.name,
        tempC: raw.main.temp,
        description: raw.weather[0].description,
        humidity: raw.main.humidity,
        windKph: parseFloat((raw.wind.speed * 3.6).toFixed(1)),
        iconUrl: `https://openweathermap.org/img/wn/${raw.weather[0].icon}@2x.png`,
        lastUpdated: formatUnixTimestamp(raw.dt),
    };
}

export function normalizeWeatherAPI(raw: WAApiResponse): WeatherData {
    return {
        city: raw.location.name,
        tempC: raw.current.temp_c,
        description: raw.current.condition.text,
        humidity: raw.current.humidity,
        windKph: raw.current.wind_kph,
        iconUrl: `https:${raw.current.condition.icon}`,
        lastUpdated: raw.location.localtime,
    };
}