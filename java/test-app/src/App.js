import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [address, setAddress] = useState('216 Prince St, Lower Sackville, Nova Scotia');
  const mapRef = useRef(null);

  useEffect(() => {
    const apiKey = 'AIzaSyCg0Lv7z3o6CrLGT4evd_FJC0O1LEs4rhU'; 

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    window.initMap = initializeMap;
    document.head.appendChild(googleMapsScript);

    function initializeMap() {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 15,
            center: results[0].geometry.location,
          });

          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
          });
        } else {
          console.error('Geocode failed: ' + status);
        }
      });
    }
  }, [address]); // Trigger the effect when the address changes

  return (
    <div className="App">
      <div ref={mapRef} style={{ width: '400px', height: '300px' }} />
    </div>
  );
}

export default App;
