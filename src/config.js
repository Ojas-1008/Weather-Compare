"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
require('dotenv').config();
// Configuration constants for weather APIs
// Keys are loaded from environment variables for security
exports.CONFIG = {
    OWM: {
        API_KEY: process.env.OWM_API_KEY || "",
        BASE_URL: "https://api.openweathermap.org/data/2.5/",
    },
    WEATHERAPI: {
        API_KEY: process.env.WEATHERAPI_KEY || "",
        BASE_URL: "https://api.weatherapi.com/v1/",
    },
};
