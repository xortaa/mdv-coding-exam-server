# Express Task Manager API

This project is a simple Task Manager API built with Express.js. It provides a RESTful interface for managing tasks, including creating, listing, deleting, and toggling the completion status of tasks. The API uses MySQL for data persistence.

## Features

- List all tasks
- Add a new task
- Delete a task by ID
- Toggle the completion status of a task by ID

## Technologies Used

- Node.js
- Express.js
- MySQL
- Body-parser for parsing incoming request bodies
- CORS to enable cross-origin requests

## Getting Started

### Prerequisites

- Node.js installed
- MySQL server running

### Installation

1. Clone the repository:
  ```bash
  git clone <repository-url>
  ```

2. Navigate to the project directory: 
  ```bash
  cd <project-directory>
  ```

3. Install dependencies: 
  ```bash
  npm install
  ```

4. Create a MySQL database and update the connection settings in the index.ts
  ```js
  const pool: mysql.Pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "mdv_coding_exam",
  });
  ```

5. Start the server with the following command 
  ```bash
  npm start
  ```

## API Endpoints

- GET / - List all tasks 
- POST / - Add a new task. Requires a JSON body with title and completed fields
- DELETE /:id/delete - Delete a task by ID
- PUT /:id/toggle-complete - Toggle the completion status of a task by ID

