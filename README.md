# Volunteer Coordination Application

Server for Volunteer Coordination Application using Express.

## Features

- Retrieve a list of all tasks
- Retrieve details of a specific task by ID
- Retrieve a list of all locations
- Retrieve a list of all skilss
- Create a new user
- Retrieve details of a specific user by ID
- Update an existing task by ID

## Before you start

1. [x] Download the code from Git-Hub : https://github.com/asafzaf/volunteer-coordinator
2. [x] Navigate to the project directory and start the server using the following command in the terminal - `$node index.js`
3. [x] Install dependencies as described in the package.json `npm install`.

## Prerequisites

- Node.js installed on your machine
- `npm` (Node Package Manager) to install dependencies

## How to Use

1. ### **Retrieve all tasks:**
   - Method: GET
   - Request: http://localhost:8080/donations/
2. ### **Retrieve details of a specific donation by ID:**
   - Method: GET
   - Request: http://localhost:8080/donations/:id
   - Note: receives id in params (PATH VARIABLES)
3. ### **Create a new donation:**
   - Method: POST
   - Request: http://localhost:8080/donations/
   - Note: receives donation (id, donorName, amount, location) in the req body
4. ### **Update an existing donation:**
   - Method: PUT
   - Request: http://localhost:8080/donations/:id
   - Note: receives id in params (PATH VARIABLES) and what to update in the req body (donorName, amount, location)
5. ### **Delete a donation:**
   - Method: DELETE
   - Request: http://localhost:8080/donations/:id
   - Note: receives id in params (PATH VARIABLES)

## Documentation
> **Postman** > https://documenter.getpostman.com/view/31102943/2sA3Bq5reJ