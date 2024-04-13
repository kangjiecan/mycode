import React, { useState } from 'react';

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
          setNovaScotiaData("No information was found.");
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
          humidity: weather.main.humidity
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Region Name:
          <input
            type="text"
            value={regionName}
            onChange={(e) => setRegionName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {typeof novaScotiaData === 'string' ? (
        <p>{novaScotiaData}</p>
      ) : novaScotiaData ? (
        <div>
          <h2>Nova Scotia Data:</h2>
          <pre>{JSON.stringify(novaScotiaData, null, 2)}</pre>
        </div>
      ) : null}
      {weatherData && (
        <div>
          <h2>Weather Data:</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
