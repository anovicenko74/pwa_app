import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const search = async (e) => {
    if (e.key == "Enter") {
      try {
        const data = await fetchWeather(query);
        setWeather(data);
        setQuery("");
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        onChange={handleChange}
        onKeyUp={search}
        value={query}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              alt={weather.weather[0].description}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
