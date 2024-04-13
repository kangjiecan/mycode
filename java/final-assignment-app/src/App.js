import React, { useState } from 'react';
import './App.css'; // Make sure the path is correct relative to th

function App() {
  const [regionName, setRegionName] = useState('');
  const [novaScotiaData, setNovaScotiaData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const fetchRegionData = (region) => {
    // First, reset data states
    setNovaScotiaData(null);
    setWeatherData(null);



    // Nova Scotia API request
    const novaScotiaUrl = `https://data.novascotia.ca/resource/f35v-t3mg.json?region=${region}`;
    fetch(novaScotiaUrl)
      .then(response => response.json())
      .then(data => {
        if (!data || data.length === 0) {
          // Handle case where Nova Scotia API returns null or empty array
          setNovaScotiaData("No Access Nova scotia in this location.");
          return; // Early return to avoid fetching weather data when no Nova Scotia data is found
        }
        // If data is found, process as before
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

        // Proceed to fetch weather data
        const apiKey = '2ea9a21e0ce9a9119507d3331b6a32ff'; // Replace with your OpenWeather API Key
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=${apiKey}&units=metric`;
        return fetch(weatherUrl);
      })
      .then(response => {
        if(response) {
          return response.json();
        }
        return null;
      })
      .then(weather => {
        if (!weather) {
          return; // Early return if there is no response for weather data
        }
        // Process and set weather data
        const formattedWeather = {
          temperature: weather.main.temp,
          condition: weather.weather[0].main,
          humidity: weather.main.humidity,
          iconUrl: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` // Add the icon URL

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
    <h2>Access Nova Scotia Location and Weather conditon research:</h2>
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
      
      {novaScotiaData && novaScotiaData.map((item, index) => (
        <div key={index} className="location-result-item">
          <p><strong>Office Address:</strong> {item.office_address}</p>
          <p><strong>Postal Code:</strong> {item.postal_code}</p>
          <p><strong>Toll Free:</strong> {item.tollfree}</p>
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


