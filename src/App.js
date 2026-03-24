import './App.css';
import { fetchWeatherByCity } from './weatherService';
import { useState } from 'react';

function App() {
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    const data = await fetchWeatherByCity("London");
    setWeather(data);
  };

  return (
    <div>
      <button onClick={handleSearch}>Get Weather</button>
      {weather && (
        <div>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].main}</p>
        </div>
      )}
    </div>
  );
}

export default App;