# Hello World API

This is a simple Node.js application that serves a "Hello World" message through an API endpoint.

## Project Structure

```
hello-world-api
├── src
│   ├── app.js          # Entry point of the application
│   └── routes
│       └── hello.js    # Route handler for the Hello World API
├── package.json        # NPM configuration file
├── .env                # Environment variables
└── README.md           # Project documentation
```

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js (version 14 or later)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/hello-world-api.git
   ```

2. Navigate to the project directory:
   ```
   cd hello-world-api
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Configuration

Create a `.env` file in the root directory and specify the port number:
```
PORT=3000
```

### Running the Application

To start the server, run the following command:
```
npm start
```

The application will be running on `http://localhost:3000`.

### API Endpoint

- **GET** `/hello` - Returns "Hello World"

### License

This project is licensed under the MIT License.