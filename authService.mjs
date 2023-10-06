
import express from "express";
import cors from 'cors'
import {GRPCConnector} from "simple-grpc-connector" 
const connector = new GRPCConnector({ host: 'localhost', port: 50051 }); 



// static  data of registered users
const registeredUsers = [
  { username: "aaa", password:"afr" },
  { username: "faraz",password:"sahista" },
  {username:"admin",password:"admin"}
];

const app = express()
const port = 8000

app.use(cors())
app.use(express.json())

export const validateUserCredentials = async (username,password)=>{
  console.log(`username ${username} and password is ${password}`)
  const result= registeredUsers.find(data=>  password==data.password && username==data.username)
  console.log("user result is",result)
  return result ? true : false;
  
}

export const authenticateHandler = (validateUserCredentials, grpcConnector) => async (req, res) => {

  
  const { username, password } = req.body;

  const isAuthenticated = await validateUserCredentials(username, password);

  if (isAuthenticated) {
    try {
      // Generate JWT token using your gRPC connector
      const token = await grpcConnector.call('generateToken', [username]);
      res.json({ success: true, access_token: token.access_token });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, error: 'Something went wrong while generating the token' });
    }
  } else {
    console.log('INVALID USERNAME OR PASSWORD');
    res.status(401).json({ success: false, error: 'Incorrect username or password' });
  }
};
app.post("/authenticate", authenticateHandler(validateUserCredentials, connector));





app.get('/', (req, res) => res.send('AuthService is running'))
app.listen(port, () => console.log(`app listening on port ${port}!`))

export {app}