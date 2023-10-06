import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const loc = useLocation();
  const navigate=useNavigate();
  const cities = ['visakhapatnam', 'mumbai', 'delhi'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = loc.state.access_token;

        // Fetch weather data for each city and update the state
        const promises = cities.map(async (city) => {
          const response = await axios.get(
            `http://localhost:8001/api/weather?city=${city}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          return response.data;
        });

        const weatherResults = await Promise.all(promises);
        setWeatherData(weatherResults);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        navigate('/')
      }
    };

    fetchData();
  }, [cities]);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {weatherData.length > 0 ? (
        <table border={1}>
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (°C)</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data, index) => (
              <tr key={index}>
                <td>{cities[index]}</td>
                <td>{data.temperature}</td>
                <td>{data.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Dashboard;
