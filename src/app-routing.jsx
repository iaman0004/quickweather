import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WeatherForecastComponent from './components/weather-forecast.component';

export default function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Navigate to='weather' replace/>}/>
        <Route path='weather' element={<WeatherForecastComponent />}/>
      </Routes>
    </BrowserRouter>
  );
}