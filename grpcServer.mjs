import {GRPCConnector} from "simple-grpc-connector" 
import jwt from 'jsonwebtoken'

const service = {
  add: (a, b) => {
    console.log(a,"a")
    console.log("b",b)
    return a + b},
  greet: (name) =>  {
    console.log(name,"tea")
    return `Hello, ${name}!`
},
}
const authService = {
  greet1: (name) =>  {
    console.log(name,"tea")
    return `Hello, ${name}!`
},
  generateToken : (username) => {
    console.log("welcome",username)
    const token = jwt.sign({ username }, "ksajfd8989@sldk", { expiresIn: '10m' }); // Token expires in 10 m
    return {
      success: true,
      access_token: token
      }
  }, 
  isAccessTokenValid: (token) => {
  try {
    // Verify the JWT token
    jwt.verify(token, 'ksajfd8989@sldk');
    // Token is valid,
    return {isValid:true };
  } catch (error) {
    // Token validation failed, return error response
    return { isValid:false, error: 'Invalid token' };
  }
}
};

// Create a new gRPC connector
const connector = new GRPCConnector({ host: 'localhost', port: 50051 })

console.log("GRPC SERVER STARTED")
// Publish the service functions
// connector.publish(service)

connector.publish(authService)
