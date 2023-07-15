import { Fragment } from "react";
import { getDayDate } from "../utility/data-time.util";

export default function WeatherCardComponent({ weather, unit, detailed = true }) {

  return (
    <div className="weather-card-component">
      <div className={`weather ${!detailed ? 'short-view' : ''}`}>
        <div className="header">{ weather.date ? getDayDate(weather.date) : 'Today' }</div>
        {detailed ? (
          <Fragment>
            <div className="current">
              <div className="temperature">
                <div className="temp-curr">{ weather?.current_temperature }&#176;{ unit } </div>
                <div className="temp-avg">
                  <div>{ weather?.min_temperature }&#176;{ unit } </div>
                  <div>{ weather?.max_temperature }&#176;{ unit } </div>
                </div>
                </div>
              <div className="type"><img src={`assets/icons/${weather?.weather_type_icon}`} alt={weather?.weather_type_icon} /></div>
            </div>
            <div className="other-details">
              <div><span className="val">{ weather?.weather_type }</span></div>
              <div><span className="type">Real Feel -</span> <span className="val">{ weather?.feels_like }&#176;{ unit }  </span></div>
              <div><span className="type">Wind -</span> <span className="val">{ weather?.windspeed }km/h,&nbsp;{ weather?.winddirection }</span></div>
              <div><span className="type">Humidity -</span> <span className="val">{ weather?.humidity } %</span></div>
            </div>
          </Fragment>
        ) : (
          <div className="upcoming">
            <div className="type"><img src={`assets/icons/${weather?.weather_type_icon}`} alt={weather?.weather_type_icon} /></div>
            <div className="temp-curr">{ weather?.avg_temperature.toFixed(1) }&#176;{ unit } </div>
            <div className="weather-type">{ weather.weather_type }</div>
          </div>
        )}
      </div>
    </div>
  );
}