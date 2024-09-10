import React, { useState } from 'react';
import './App.css';
import MapComponent from './MapComponent';

function App() {
  const [regionName, setRegionName] = useState('');
  const [novaScotiaData, setNovaScotiaData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchRegionData = (region) => {
    setNovaScotiaData(null);
    setWeatherData(null);

    const novaScotiaUrl = `https://data.novascotia.ca/resource/f35v-t3mg.json?region=${region}`;
    fetch(novaScotiaUrl)
      .then(response => response.json())
      .then(data => {
        if (!data || data.length === 0) {
          setNovaScotiaData("No Access Nova Scotia locations in this region.");
          return;
        }
        const filteredData = data.map(item => ({
          office_address: item.office_address,
          postal_code: item.postal_code,
          tollfree: item.tollfree
        }));

        const uniqueData = Object.values(filteredData.reduce((acc, cur) => {
          const key = `${cur.office_address}|${cur.postal_code}`;
          acc[key] = acc[key] || cur;
          return acc;
        }, {}));

        setNovaScotiaData(uniqueData);
        const apiKey = '2ea9a21e0ce9a9119507d3331b6a32ff';
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric`;
        return fetch(weatherUrl);
      })
      .then(response => {
        if (response) {
          return response.json();
        }
        return null;
      })
      .then(weather => {
        if (!weather) {
          return;
        }

        const formattedWeather = {
          temperature: weather.main.temp,
          condition: weather.weather[0].main,
          humidity: weather.main.humidity,
          iconUrl: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
        };
        setWeatherData(formattedWeather);
      })
      .catch(error => console.error("Error fetching data:", error));
  };
  const formatRegionName = (regionName) => {
    return regionName.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedRegionName = formatRegionName(regionName);
    fetchRegionData(formattedRegionName);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="search-form">
        <h2>Access Nova Scotia Location and Weather condition research:</h2>
        <label className="search-label">
          Your Region Name:
          <input
            type="text"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
            className="search-bar"
          />
        </label>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {typeof novaScotiaData === 'string' ? (
        <p>{novaScotiaData}</p>
      ) : (
        <div className="location-search-results">
          {novaScotiaData && novaScotiaData.map((locationData, index) => (
            <div key={index} className="location-result-item">
              <p><strong>Office Address:</strong> {locationData.office_address}</p>
              <p><strong>Postal Code:</strong> {locationData.postal_code}</p>
              <p><strong>Toll Free:</strong> {locationData.tollfree}</p>
              <MapComponent address={`${locationData.office_address}, ${locationData.postal_code} Nova Scotia Canada`} />

            </div>
          ))}
        </div>
      )}
      {weatherData && (
        <div className="weather-results">
          <h2>Weather Condition:</h2>
          <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
          <p><strong>Condition:</strong> {weatherData.condition}</p>
          <p><strong>Humidity:</strong> {weatherData.humidity}%</p>
          {weatherData.iconUrl && (
            <img src={weatherData.iconUrl} alt="Weather icon" className="weather-icon" />
          )}
        </div>
      )}
    </div>
  );

}

export default App;
