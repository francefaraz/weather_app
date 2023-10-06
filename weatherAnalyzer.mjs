
import express from "express";
import cors from 'cors'
import {GRPCConnector} from "simple-grpc-connector" 
const connector = new GRPCConnector({ host: 'localhost', port: 50051 }); 
import axios   from "axios"
import mysql from 'mysql2/promise'

async function fetchData() {
  const dbConnection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_pro',
  });

  try {
    const [rows, fields] = await dbConnection.execute('SELECT * FROM temperature_label');
    // console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error; 
  } finally {
    dbConnection.end();
  }
}

const app = express()
const port = 8001

app.use(cors())
app.use(express.json())


const isAuthorized = async (req,res,next)=>{
  
  
  
  try {
  const accessToken = req.headers.authorization.split(' ')[1];
  console.log(accessToken)
  const result = await connector.call('isAccessTokenValid', [accessToken]);

  if (result.isValid) {
    next(); 
  } else {
    
    res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
} catch (error) {
  console.error('Error validating token:', error);
  res.status(500).json({ success: false, message: 'Make sure token is passed correct' });
}
};



app.get('/api/weather',isAuthorized, async (req, res) => {
  const { city } = req.query;

  console.log(city,"city")

      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=09aebe51e0715cab585284c50cf1ec0f`)
          .then(async(response) => {
              const temperature = response.data.main.temp - 273.15; // Convert from Kelvin to Celsius
              console.log("Temperature: ", temperature, "°C");
              const label = await  getTemperatureLabel(temperature);
              console.log("Temp Label: ", label);
              res.status(200).json({ success: true, temperature:temperature, label:label });
          })
          .catch(error => {
            console.log(error)
              res.status(500).json({ success: false, message: 'Error fetching weather data' });
          });
  
});



async function getTemperatureLabel(temperature) {
const weatherLabels = await fetchData()


  const weatherData = await weatherLabels.find(label => temperature >= label.min_temperature && temperature <= label.max_temperature);

  return weatherData ? weatherData.label : 'Unknown';
}





app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))