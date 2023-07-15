import { Fragment, useContext, useEffect, useState } from "react";
import { fetchWeatherDetails, getWeatherCondition, getWindDirection } from "../services/weather.service";
import { CityContext } from "../context/city.context";
import WeatherCardComponent from "./weather-card.component";
import ToggleComponent from "./toggle.component";

const TOGGLE_CONFIG = [
  {
    _id: 'celsius',
    label: 'Celsius',
    active: true
  },
  {
    _id: 'fahrenheit',
    label: 'Fahrenheit',
    active: false
  }
]

export default function ForecastComponent({ temperatureUnit, toggleTemperatureUnit }) {
  const [weather, setWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState([]);
  const cityContext = useContext(CityContext);
  const [unit, setUnit] = useState('');

  useEffect(() => {
    if (cityContext.city) {
      fetchWeatherDetails(cityContext.city, temperatureUnit).then(res => {
        const data = res.data;
        const weatherObj = {};
        const weathercodeDetail = getWeatherCondition(data.current_weather.weathercode);
        weatherObj.current_temperature = data.current_weather?.temperature ?? 0;
        weatherObj.windspeed = data.current_weather?.windspeed ?? 0;
        weatherObj.winddirection = getWindDirection(data.current_weather.winddirection);
        weatherObj.weather_type = weathercodeDetail.type;
        weatherObj.weather_type_icon = weathercodeDetail.icon;
        weatherObj.max_temperature = data.daily.apparent_temperature_max.at(0) ?? 0;
        weatherObj.min_temperature = data.daily.apparent_temperature_min.at(0) ?? 0;
        weatherObj.humidity = data.hourly.relativehumidity_2m.at(0) ?? 0;
        weatherObj.feels_like = data.hourly.apparent_temperature.at(0) ?? 0;
        setWeather(weatherObj);
        
        const futureData = [];
        const dailyData = data.daily;
        for(let i = 1; i<=4; i++) {
          const weathercodeDetail = getWeatherCondition(dailyData.weathercode[i]);
          futureData.push({
            date: dailyData.time[i],
            avg_temperature: (dailyData.apparent_temperature_max[i] + dailyData.apparent_temperature_min[i])/2,
            weather_type: weathercodeDetail.type,
            weather_type_icon: weathercodeDetail.icon
          });
        }
        setFutureWeather(futureData);

        setUnit(temperatureUnit === 'celsius' ? 'C' : 'F');
      });
    }
  }, [cityContext.city, temperatureUnit]);

  return(
      <div className="forecast-component">
        {weather ? (
          <Fragment>
              { cityContext.city ? (
                  <div className="weather-legend">
                    <div className="selected-location">
                      <span className="material-symbols-outlined">location_on</span>
                      <span>{ cityContext.city.name }, {cityContext.city.admin1}, {cityContext.city.country_code}</span>
                    </div>
                    <ToggleComponent config={TOGGLE_CONFIG} toggleHandler={toggleTemperatureUnit} />
                  </div>
                ) : <></> }
              <div className="weather-card-wrapper">
                <div key="forecast-card-0" className="card-item">
                  <WeatherCardComponent unit={unit} weather={weather} />
                </div>
                {futureWeather.map((weather, i) => (
                  <div key={`forecast-card-${i+1}`} className="card-item">
                    <WeatherCardComponent unit={unit} weather={weather} detailed={false} />
                  </div>
                ))}
            </div>
          </Fragment>
        ) : (
          <div className="no-city-selection">
            <div className="logo">
              <img src="assets/icons/weather.svg" alt="No selection" />
            </div>
            <div className="message">Please search and select a location to see weather details.</div>
          </div>
        )}
        </div>
  )
}