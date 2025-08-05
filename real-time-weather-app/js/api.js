class WeatherAPI {
    constructor() {
        this.apiKey = CONFIG.API_KEY;
        this.baseUrl = CONFIG.BASE_URL;
    }

    async fetchWeatherByCity(city) {
        try {
            const response = await fetch(
                `${this.baseUrl}${CONFIG.ENDPOINTS.FORECAST}?key=${this.apiKey}&q=${encodeURIComponent(city)}&days=4&aqi=yes&alerts=no`
            );
                    
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error('City not found. Please check the spelling and try again.');
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            throw new Error(error.message || 'Failed to fetch weather data');
        }
    }
    
    async fetchWeatherByCoords(lat, lon) {
        try {
            const response = await fetch(
                `${this.baseUrl}${CONFIG.ENDPOINTS.FORECAST}?key=${this.apiKey}&q=${lat},${lon}&days=4&aqi=yes&alerts=no`
            );
                    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }      
            return await response.json();
        } catch (error) {
            throw new Error('Failed to fetch weather data for your location');
        }
    }
}