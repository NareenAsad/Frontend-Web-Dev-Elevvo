# Weather Dashboard 🌤️

A beautiful, responsive weather dashboard that provides real-time weather information for cities worldwide. Built with vanilla HTML, CSS, and JavaScript with a modern glassmorphism design.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions and 3-day forecasts
- **Multiple Cities**: Add and track weather for multiple cities simultaneously
- **Geolocation Support**: Use your current location to get local weather
- **Search History**: Keep track of previously searched cities
- **Search Suggestions**: Auto-suggestions while typing city names
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism design with smooth animations and transitions
- **Weather Details**: Comprehensive weather information including:
  - Temperature (current and feels-like)
  - Humidity and visibility
  - Wind speed and direction
  - Air pressure
  - UV index
  - 3-day forecast

## 🚀 Demo

You can try the weather dashboard [here](https://weather-app-drab-omega-25.vercel.app/).

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features and modern APIs
- **WeatherAPI**: Real-time weather data provider
- **Font Awesome**: Beautiful weather and UI icons
- **Geolocation API**: For location-based weather

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get a WeatherAPI key**
   - Visit [WeatherAPI.com](https://www.weatherapi.com/)
   - Sign up for a free account
   - Get your API key from the dashboard

3. **Configure the API key**
   
   Option 1: Environment Variables (Recommended)
   ```bash
   # Create a .env file in the root directory
   echo "WEATHER_API_KEY=your_api_key_here" > .env
   ```
   
   Option 2: Direct Configuration
   ```javascript
   // In the HTML file, replace the API key in the CONFIG object
   const CONFIG = {
       API_KEY: 'your_api_key_here',
       // ... other config
   };
   ```

4. **Serve the application**
   
   For development, you can use any local server:
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server
   ```
   
   **Using Live Server (VS Code extension):**
   - Install Live Server extension
   - Right-click on `index.html` and select "Open with Live Server"

5. **Open in browser**
   Navigate to `http://localhost:8000` (or your server's URL)

## 🎯 Usage

### Adding Cities
1. **Search by Name**: Type a city name in the search box and press Enter or click the search button
2. **Use Current Location**: Click the location button to add weather for your current location
3. **Search History**: Click the history button to see and reselect previously searched cities

### Managing Cities
- **Remove Cities**: Click the '×' button on any weather card to remove it
- **View Details**: Each card shows comprehensive weather information and a 3-day forecast

### Search Features
- **Auto-suggestions**: Get city suggestions as you type
- **Search History**: Access your search history with timestamps
- **Clear History**: Remove all or individual items from search history

## 📁 Project Structure

```
weather-dashboard/
├── index.html              # Main HTML file with embedded CSS and JS
├── README.md              # This file
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore file

```

## 🔧 Configuration

The application can be configured through the `CONFIG` object in the JavaScript code:

```javascript
const CONFIG = {
    API_KEY: 'your_api_key_here',
    BASE_URL: 'https://api.weatherapi.com/v1',
    ENDPOINTS: {
        FORECAST: '/forecast.json',
        CURRENT: '/current.json'
    },
    STORAGE_KEY: 'weather-cities',
    HISTORY_STORAGE_KEY: 'weather-search-history',
    GEOLOCATION_OPTIONS: {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
    }
};
```

## 🌐 API Integration

This project uses [WeatherAPI.com](https://www.weatherapi.com/) for weather data. The API provides:

- Current weather conditions
- 3-day weather forecasts
- Location-based weather data
- Air quality information
- Weather alerts (if available)

**API Endpoints Used:**
- `GET /forecast.json` - Get weather forecast data
- `GET /current.json` - Get current weather data

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:

- **Desktop**: Full-width layout with multiple weather cards
- **Tablet**: Adapted grid layout with proper spacing
- **Mobile**: Single-column layout with touch-friendly controls

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like design with backdrop blur effects
- **Smooth Animations**: CSS animations for loading, hover effects, and transitions
- **Color Gradients**: Beautiful gradient backgrounds and button styles
- **Weather Icons**: High-quality weather condition icons
- **Dark Theme**: Elegant dark color scheme suitable for all lighting conditions

## 🔒 Privacy & Security

- **No Personal Data Storage**: The app doesn't store personal information
- **Local Storage Only**: Search history is stored locally in your browser
- **HTTPS**: Uses secure HTTPS connections for API calls
- **Geolocation**: Location access requires user permission

## 🐛 Known Issues & Limitations

- **Browser Storage**: Some features (like persistent search history) may not work in certain environments
- **API Limits**: Free WeatherAPI accounts have request limits
- **Geolocation**: Requires HTTPS for location access in modern browsers
- **CORS**: May require a local server for development due to CORS policies

## 🚀 Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Extended 7-day forecast
- [ ] Weather maps integration
- [ ] Multiple temperature units (Fahrenheit/Celsius)
- [ ] Favorite cities with drag-and-drop reordering
- [ ] Weather data export functionality
- [ ] PWA (Progressive Web App) features
- [ ] Dark/Light theme toggle
- [ ] Weather widgets for embedding

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Test your changes thoroughly
- Update documentation if needed
- Ensure responsive design principles
- Optimize for performance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.tionality
![Search Features](https://via.placeholder.com/600x400/667eea/ffffff?text=Search+Features)
