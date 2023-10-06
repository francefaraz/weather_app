# Weather Application

This application provides weather information based on the city. It consists of two main endpoints: authentication and weather data retrieval.

## Prerequisites

Before running the application, ensure you have Node.js installed on your system. If not, you can download and install it from [Node.js official website](https://nodejs.org/).

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd weather-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run the initial database setup script:

    ```bash
    node initial_db.js
    ```
5. Run the Grpcserver AuthService and WeatherAnalyzer:

    ```bash
    node grpcServer.mjs 
    node authService.mjs
    node weatherAnalyzer.mjs  
    ```
6. Run the Frontend:
    ```bash
    cd weather-fe
    npm start
    ```
## Usage

### Authentication

To authenticate and obtain a JWT token, use the following endpoint:

- **Endpoint:** `POST /authenticate`
- **Request Body:**

    ```json
    {
      "username": "admin",
      "password": "admin"
    }
    ```

    Example using cURL:

    ```bash
    curl -X POST http://localhost:8000/authenticate -d '{"username": "admin", "password": "admin"}' -H "Content-Type: application/json"
    ```

    The response will contain an access token if the authentication is successful.

### Weather Data Retrieval

To retrieve weather data for a specific city, use the following endpoint:

- **Endpoint:** `GET /api/weather?city=<city-name>`
- **Request Header:**

    ```
    Authorization: Bearer <access-token>
    ```

    Example using cURL:

    ```bash
    curl -X GET http://localhost:8001/api/weather?city=goa -H "Authorization: Bearer <access-token>"
    ```

    Replace `<access-token>` with the token obtained during the authentication process.

## Running Tests

To run the tests, use the following command:
before do npm test make sure to run grpcServer 
```bash 
    node grpcServer.mjs   
```
and then run in another terminal
```bash
npm test
```