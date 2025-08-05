class Utils {
    static formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        }

        return date.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    static formatDateTime(date) {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static validateCityName(city) {
        return city && city.trim().length > 0;
    }

    static getGeolocationErrorMessage(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                return 'Location access denied by user';
            case error.POSITION_UNAVAILABLE:
                return 'Location information is unavailable';
            case error.TIMEOUT:
                return 'Location request timed out';
            default:
                return 'An unknown error occurred while retrieving location';
        }
    }

    static capitalizeWords(str) {
        return str.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }
}