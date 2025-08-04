/* ===== MAIN.JS ===== */
class WeatherDashboard {
    constructor() {
        this.api = new WeatherAPI();
        this.ui = new WeatherUI('weatherContainer');
        this.cities = new Set();

        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.locationBtn = document.getElementById('locationBtn');

        this.init();
    }

    init() {
        this.initEventListeners();
        this.loadSavedCities();
    }

    initEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.locationBtn.addEventListener('click', () => this.getCurrentLocation());

        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        this.cityInput.addEventListener('input', (e) => {
            if (e.target.value.trim() === '') {
                this.ui.clearError();
            }
        });

        const debouncedSearch = Utils.debounce(() => {
            const city = this.cityInput.value.trim();
            if (city.length > 2) {
                // Optional: autocomplete feature
            }
        }, 300);

        this.cityInput.addEventListener('input', debouncedSearch);
    }

    async handleSearch() {
        const city = this.cityInput.value.trim();

        if (!Utils.validateCityName(city)) {
            this.ui.showError('Please enter a city name');
            return;
        }

        if (this.cities.has(city.toLowerCase())) {
            this.ui.showError('City already added to dashboard');
            return;
        }

        await this.fetchWeatherData(city);
    }

    async fetchWeatherData(city) {
        this.ui.showLoading(`Fetching weather for ${city}...`);

        try {
            const data = await this.api.fetchWeatherByCity(city);
            this.addCity(data);
            this.cityInput.value = '';
            this.ui.hideLoading();
            this.ui.clearError();
        } catch (error) {
            this.ui.hideLoading();
            this.ui.showError(error.message);
        }
    }

    async getCurrentLocation() {
        if (!navigator.geolocation) {
            this.ui.showError('Geolocation is not supported by this browser');
            return;
        }

        this.ui.showLoading('Getting your location...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                await this.fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                this.ui.hideLoading();
                this.ui.showError(Utils.getGeolocationErrorMessage(error));
            },
            CONFIG.GEOLOCATION_OPTIONS
        );
    }

    async fetchWeatherByCoords(lat, lon) {
        try {
            const data = await this.api.fetchWeatherByCoords(lat, lon);
            this.addCity(data);
            this.ui.hideLoading();
        } catch (error) {
            this.ui.hideLoading();
            this.ui.showError(error.message);
        }
    }

    addCity(data) {
        const cityName = data.location.name.toLowerCase();

        if (this.cities.has(cityName)) {
            this.ui.showError('City already added to dashboard');
            return;
        }

        this.cities.add(cityName);
        this.saveCities();
        this.ui.addWeatherCard(data);
    }

    removeCity(cityName, cardElement) {
        this.cities.delete(cityName);
        this.saveCities();
        this.ui.removeWeatherCard(cardElement);
    }

    saveCities() {
        // localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(Array.from(this.cities)));
    }

    loadSavedCities() {
        // const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        // if (saved) {
        //     try {
        //         const citiesArray = JSON.parse(saved);
        //         citiesArray.forEach(city => {
        //             this.fetchWeatherData(city);
        //         });
        //     } catch (error) {
        //         console.error('Error loading saved cities:', error);
        //     }
        // }
    }
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherDashboard = new WeatherDashboard();
});
