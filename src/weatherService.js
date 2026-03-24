// weatherService.js
// Handles all API calls to OpenWeather

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_URL = "https://api.openweathermap.org/geo/1.0";

// Convert city name to coordinates
export const getCoordsFromCity = async (city) => {
    const res = await fetch (
        `${GEO_URL}/direct?q=${city}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    if(!data.length) throw new Error("City not found");
    return { lat: data[0].lat, lon: data[0].lon };
};

// Fetch weather using coordinates
export const fetchWeatherByCoords = async (lat, lon) => {
    const res = await fetch (
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    if (!res.ok) throw new Error("Weather Fetch Failed");
    return await res.json();
};

//Main Function:  Fetch using city name by call
export const fetchWeatherByCity = async (city) => {
  const { lat, lon } = await getCoordsFromCity(city);
  return await fetchWeatherByCoords(lat, lon);
};

// Fetch using browser location
export const fetchWeatherByLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                const data = await fetchWeatherByCoords(
                    coords.latitude, coords.longitude
                );
                resolve(data);
            },
            (err) => reject(new Error("Location Access Denied"))
        );
    });
};