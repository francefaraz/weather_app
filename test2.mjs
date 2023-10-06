import {GRPCConnector} from "simple-grpc-connector" 
const connector = new GRPCConnector({ host: 'localhost', port: 50051 }); 
console.log(connector)
// Call a published function
// connector
//   .call('greet1', "14")
//   .then((result) => {
//     console.log('Result: is', result); // Output: 5
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
  connector
  .call('isAccessTokenValid', ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsImlhdCI6MTY5NjUyMjY5NiwiZXhwIjoxNjk2NTIzMjk2fQ.3r8u6ml_9Mgr0fx3pIM57xv_8SA0MFnln-WcVcH3J5o'])
  .then((result) => {
    console.log('Token is:', result); // Output: Token generated: <your-token>
  })
  .catch((error) => {
    console.error('Error validating token:', error);
  });


  // connector
  // .call('isAccessTokenValid', ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsImlhdCI6MTY5NjUyMjY5NiwiZXhwIjoxNjk2NTIzMjk2fQ.3r8u6ml_9Mgr0fx3pIM57xv_8SA0MFnln-WcVcH3J5o'], (err, response) => {
  //   console.log(response,"resp")
  //     if (err || !response.isValid) {
  //         return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  //     }})