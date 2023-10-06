// authService.test.mjs
import request from 'supertest';
import { app,authenticateHandler } from './authService.mjs'; // Import your Express app instance
import {app as weather} from './weatherAnalyzer.mjs';
let token = "fa.far.wP92Jsu1_fnxURLXsUzFoFWW0PP4zupKy_v5sHAinb0"

describe('POST /authenticate', () => {
  
  test('responds with JSON and 200 OK for valid credentials', async () => {
    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'admin', password: 'admin' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then(({body})=>{
        token=body.access_token
        expect(body).toEqual(expect.objectContaining({ success: true, access_token: expect.any(String) }));

      })
      ;

    
  },10000);

  test('responds with 401 Unauthorized for invalid credentials', async () => {
    console.log("TOKEN IS",token)
    const response = await request(app)
      .post('/authenticate')
      .send({ username: 'invalidUser', password: 'invalidPassword' })
      .expect(401);

    expect(response.statusCode).toBe(401);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toEqual(expect.objectContaining({ success: false, error: 'Incorrect username or password' }));
  });

  describe('GET api/weather',()=>{
    test('responds with JSON and 200 OK for valid temperature',async ()=>{
      console.log("TOKEN IS IN WEATHER ",token)
      const response=await request(weather)
            .get('api/weather?city=goa')
            .set('Authorization',`Bearer ${token}`)

    })
    test('responds with 401 Token is invalid or expired',async()=>{
      const response=await request(weather)
            .get('api/weather?city=vizag')
            .set('Authorization',`Bearer askfjdkasdfkasdfk}`)
    })
  })

  describe


});
