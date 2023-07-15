import { useState } from "react";
import { CityContext } from "../context/city.context";
import CitySearchComponent from "./city-search.component";
import ForecastComponent from "./forecast.component";

export default function WeatherForecastComponent() {
  const [city, setCity] = useState(undefined);
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const toggleTemperatureUnit = (toggle) => {
    if (toggle._id === temperatureUnit) return;
    setTemperatureUnit(temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius'); 
  };

  return(
    <div className="weather-forecast-component">
      <div className="branding">Quick Weather</div>
      <div className="sub-heading">How's weather up there ?</div>
      <CityContext.Provider value={{ city, setCity }}>
        <CitySearchComponent />
        <ForecastComponent temperatureUnit={temperatureUnit} toggleTemperatureUnit={toggleTemperatureUnit} />
      </CityContext.Provider>
    </div>
  );
}
