class WeatherUI {
            constructor(containerId) {
                this.container = document.getElementById(containerId);
            }

            createWeatherCard(data) {
                const card = document.createElement('div');
                card.className = 'weather-card';
                card.style.animationDelay = '0.1s';

                const current = data.current;
                const location = data.location;
                const forecast = data.forecast.forecastday;

                card.innerHTML = `
                    <div class="card-header">
                        <div class="city-name">
                            <i class="fas fa-map-marker-alt"></i>
                            ${location.name}, ${location.country}
                        </div>
                        <button class="remove-btn" onclick="weatherDashboard.removeCity('${location.name.toLowerCase()}', this.closest('.weather-card'))">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="weather-main">
                        <div class="temperature">${Math.round(current.temp_c)}°C</div>
                        <img src="https:${current.condition.icon}" alt="${current.condition.text}" class="weather-icon">
                    </div>

                    <div class="weather-info">
                        <div class="info-item">
                            <i class="fas fa-eye"></i>
                            <span>Visibility: ${current.vis_km} km</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-tint"></i>
                            <span>Humidity: ${current.humidity}%</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-wind"></i>
                            <span>Wind: ${current.wind_kph} km/h</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-thermometer-half"></i>
                            <span>Feels like: ${Math.round(current.feelslike_c)}°C</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-compress-arrows-alt"></i>
                            <span>Pressure: ${current.pressure_mb} mb</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-sun"></i>
                            <span>UV Index: ${current.uv}</span>
                        </div>
                    </div>

                    <div class="forecast-container">
                        <div class="forecast-title">3-Day Forecast</div>
                        <div class="forecast-grid">
                            ${forecast.slice(1, 4).map((day, index) => `
                                <div class="forecast-item" style="animation-delay: ${0.2 + index * 0.1}s">
                                    <div class="forecast-day">${Utils.formatDate(day.date)}</div>
                                    <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="forecast-icon">
                                    <div class="forecast-temp">
                                        ${Math.round(day.day.maxtemp_c)}° / ${Math.round(day.day.mintemp_c)}°
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

                return card;
            }

            showLoading(message = 'Loading...') {
                const existingLoading = this.container.querySelector('.loading');
                if (existingLoading) return;

                const loading = document.createElement('div');
                loading.className = 'loading';
                loading.innerHTML = `
                    <div class="spinner"></div>
                    <span>${message}</span>
                `;
                
                this.container.appendChild(loading);
            }

            hideLoading() {
                const loading = this.container.querySelector('.loading');
                if (loading) {
                    loading.remove();
                }
            }

            showError(message) {
                this.clearError();
                
                const error = document.createElement('div');
                error.className = 'error-message';
                error.innerHTML = `
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>${message}</span>
                `;
                
                this.container.insertBefore(error, this.container.firstChild);
                
                setTimeout(() => {
                    if (error.parentNode) {
                        error.remove();
                    }
                }, 5000);
            }

            clearError() {
                const existingError = this.container.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
            }

            showEmptyState() {
                const emptyState = document.createElement('div');
                emptyState.className = 'empty-state';
                emptyState.innerHTML = `
                    <i class="fas fa-cloud-sun"></i>
                    <h3>No cities added yet</h3>
                    <p>Search for a city or use your current location to get started</p>
                `;
                this.container.appendChild(emptyState);
            }

            addWeatherCard(data) {
                // Remove empty state if it exists
                const emptyState = this.container.querySelector('.empty-state');
                if (emptyState) {
                    emptyState.remove();
                }

                // Ensure weather-grid exists
                let weatherGrid = this.container.querySelector('.weather-grid');
                if (!weatherGrid) {
                    weatherGrid = document.createElement('div');
                    weatherGrid.className = 'weather-grid';
                    this.container.appendChild(weatherGrid);
                }

                const weatherCard = this.createWeatherCard(data);
                weatherGrid.appendChild(weatherCard);

                // Add staggered animation
                setTimeout(() => {
                    weatherCard.style.animationDelay = '0s';
                }, 100);
            }

            removeWeatherCard(cardElement) {
                cardElement.style.animation = 'cardSlideOut 0.4s ease-in-out forwards';
                
                setTimeout(() => {
                    cardElement.remove();
                    
                    // Show empty state if no cities left
                    const weatherGrid = this.container.querySelector('.weather-grid');
                    if (weatherGrid && weatherGrid.children.length === 0) {
                        weatherGrid.remove();
                        this.showEmptyState();
                    }
                }, 400);
            }
}