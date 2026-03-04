// Configuration constants for weather APIs
// API keys are loaded from environment variables for security
export const CONFIG = {
    OWM: {
        API_KEY: process.env.OWM_API_KEY || "", 
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather", 
    },

    WEATHERAPI: {
        API_KEY: process.env.WEATHERAPI_KEY || "", 
        BASE_URL: "https://api.weatherapi.com/v1/current.json", 
    },
} as const;