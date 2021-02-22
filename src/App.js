import React, {
  useState,
  useEffect
} from 'react';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Weather from './components/Weather';

const OPEN_WEATHER_MAP_KEY = '';

const App = () => {
  const [
    forecast,
    setForecast
  ] = useState([]);
  
  const [
    error,
    setError
  ] = useState('');

  const fetchWeatherAsync = async () => {
    try {
      const response = await axios.get(
        'https://api.openweathermap.org/data/2.5/forecast', {
          params: {
            q: 'Raleigh',
            appid: OPEN_WEATHER_MAP_KEY,
            units: 'imperial'
          }
        }
      );
      
      const transformData = await response.data.list.map( ( data ) => ({
        dt: data.dt,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        icon: data.weather[0].icon,
        desc: data.weather[0].description,
        clouds: data.clouds.all,
        wind: data.wind.speed,
      }));

      setForecast( transformData );
    } catch ( err ) {
      setError( err.stack );
    }
  };

  useEffect( () => {
    fetchWeatherAsync();
  }, []);
  
  return (
    <div className="App">
      <CssBaseline />
        <Container maxWidth="sm">
        { error.length === 0 ? (
          <Weather
            forecast={ forecast }
            location="Raleigh"
            unit="imperial"
          />
        ) : (
          <div>
            <h2>
              Unable to get weather data!
            </h2>
            
            <pre>
              { error }
            </pre>
          </div>
        ) }
      </Container>
    </div>
  );
}

export default App;
