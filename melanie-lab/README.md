![cf](https://i.imgur.com/7v5ASc8.png) Lab 12: Express Middleware
======

## Directory Structure
* **README.md**
* **.gitignore**
* **.eslintrc**
* **.eslintignore**
* **package.json**
  * a `lint` script has been configured for running eslint
  * a `test` script has been configured for running jest
  * a `test-coverage` script has been configured for running jest with coverage information
  * a `start` script has been configured for running the server
* **lib/** - contains helper modules & custom middleware
  * **storage.js**
  * **cors-middleware.js**
  * **error-middleware.js**
* **model/** - contains resource model
  * **recipe.js**
* **data/** - contains data within file system
  * **recipe/**
* **route/** - contains resource routes
  * **recipe-router.js**
* **__test__** - contains route tests
  * **recipe-route.test.js**
* **server.js** - runs the application

## Installation
1. To install this application, download the files from this repository
2. `cd` to the repository directory and run `npm i`
3. Use `npm run start` or `node server.js` to start the server connection
4. Alternatively, run `npm run test` to run tests

## Server Endpoints
Users can make the following requests:

GET: With a valid recipe id, user can use the following route: 
```
localhost:3000/api/recipe/:id
```

GET: Without an recipe id, user can use the following route to retrieve an array of available routes:
```
localhost:3000/api/recipe
```

POST: Recipes can be created using the following route with name, prep time, cook time, and protein type inputs: 
```
localhost:3000/api/recipe
```

PUT: Recipes can be updated using the following route: 
```
localhost:3000/api/recipe/:id
```