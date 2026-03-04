// Configuration constants for weather APIs
// API keys are injected at build time by GitHub Actions from repository secrets
// Placeholder values below are replaced during CI/CD deployment
export const CONFIG = {
    OWM: {
        API_KEY: "__OWM_API_KEY__",
        BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
    },

    WEATHERAPI: {
        API_KEY: "__WEATHERAPI_KEY__",
        BASE_URL: "https://api.weatherapi.com/v1/current.json",
    },
} as const;