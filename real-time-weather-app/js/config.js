const CONFIG = {
    API_KEY: '729e4163bbe04d3d912111953250208',
    BASE_URL: 'https://api.weatherapi.com/v1',
    ENDPOINTS: {
        FORECAST: '/forecast.json',
        CURRENT: '/current.json'
    },
    STORAGE_KEY: 'weather-cities',
    GEOLOCATION_OPTIONS: {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
    }
};
