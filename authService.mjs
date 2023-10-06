
import express from "express";
import cors from 'cors'
import {GRPCConnector} from "simple-grpc-connector" 
const connector = new GRPCConnector({ host: 'localhost', port: 50051 }); 



// static  data of registered users
const registeredUsers = [
  { username: "aaa", password:"afr" },
  { username: "faraz",password:"sahista" }
];

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

const validateUserCredentials = async (username,password)=>{
  console.log(`username ${username} and password is ${password}`)
  console.log(registeredUsers.find(data=>  password==data.password && username==data.username),"hello")
  const result= registeredUsers.find(data=>  password==data.password && username==data.username)
  console.log(result,"result is")
  return result ? true : false;
  
}

app.post('/authenticate', async(req, res) => {
  console.log(req.body,"af")
    const { username, password } = req.body;


  
    const isAuthenticated = await validateUserCredentials(username, password);
    console.log("is user authenicated",isAuthenticated)
    if (isAuthenticated) {
      // Generate JWT token
      connector
  .call('generateToken', [username])
  .then((result) => {
    console.log('Result: is', result);
    res.json(result)
  })
  .catch((error) => {
    console.error('Error:', error);
    res.status(401).json({ success:false,error: 'something went wrong' });
  });

    } else {
      console.log("INVALID USERNAME OR PASSWORD")
      res.status(401).json({ success:false,error: '“Incorrect username or password“' });
    }
  });
  




app.get('/', (req, res) => res.send('AuthService is running'))
app.listen(port, () => console.log(`app listening on port ${port}!`))