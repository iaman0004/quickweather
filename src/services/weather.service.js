import { WEATHER_BASE_URL } from '../constants/url.constant';
import { makeApiCall } from './rest.service';

const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];

export const fetchWeatherDetails = (city, temperatureUnit) => {
  const url = `${WEATHER_BASE_URL}v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&temperature_unit=${temperatureUnit}&forecast_days=5&hourly=relativehumidity_2m,apparent_temperature&daily=apparent_temperature_max,apparent_temperature_min,winddirection_10m_dominant,weathercode&timezone=${city.timezone}`;
  return makeApiCall('GET', url);
};

export const getWeatherCondition = weathercode => {
  if (weathercode === 0)
    return {
      type: 'Clear Sky',
      icon: 'day.svg'
    };
  else if (weathercode >= 1 && 3 >= weathercode) 
    return {
      type: 'Partly cloudy, and overcast',
      icon: 'cloudy-day-1.svg'
    };
  else if (weathercode >= 45 && 48 >= weathercode)
    return {
      type: 'Fog and depositing rime fog',
      icon: 'cloudy.svg'
    };
  else if (weathercode >= 51 && 55 >= weathercode)
    return {
      type: 'Drizzle: Moderate intensity',
      icon: 'rainy-4.svg'
    };
  else if (weathercode >= 56 && 57 >= weathercode)
    return {
      type: 'Freezing Drizzle: Dense intensity',
      icon: 'snowy-2.svg'
    };
  else if (weathercode >= 61 && 65 >= weathercode)
    return {
      type: 'Rain: Slight heavy intensity',
      icon: 'rainy-6.svg'
    };
  else if (weathercode >= 66 && 67 >= weathercode)
    return {
      type: 'Freezing Rain: Light & heavy intensity',
      icon: 'snowy-6.svg'
    };
  else if (weathercode >= 71 && 75 >= weathercode)
    return {
      type: 'Snow fall: Slight and heavy intensity',
      icon: 'snowy-3.svg'
    };
  else if (weathercode === 77)
    return {
      type: 'Snow grains',
      icon: 'snowy-4.svg'
    };
  else if (weathercode >= 80 && 82 >= weathercode)
    return {
      type: 'Rain showers: Slight and violent',
      icon: 'rainy-5.svg'
    };
  else if (weathercode >= 85 && 86 >= weathercode)
    return {
      type: 'Snow showers slight and heavy',
      icon: 'snowy-2.svg'
    };
  else if (weathercode === 95)
    return {
      type: 'Thunderstorm: Slight or moderate',
      icon: 'thunder.svg'
    };
  else if (weathercode >= 96 && 99 >= weathercode)
    return {
      type: 'Thunderstorm with heavy hail',
      icon: 'thunder.svg'
    };
}

export const getWindDirection = degree => {
  return directions[Math.round(degree / 45) % 8];
}
