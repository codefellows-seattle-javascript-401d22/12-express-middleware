# Code Fellows: Code 401d22: Full-Stack JavaScript

## Lab 12: Single Resource Express API

The purpose of this lab is to create a single resource API that utilizes ExpressJS for handling requests with middleware for error handling.

## Tech/frameworks/packages

- node 
- npm
- node packages
  - Production
    - bluebird
    - body-parser 
    - debug
    - eslint
    - express
    - http-errors
    - morgan
    - uuid
    - jest
    - superagent


## How to use?
Clone this repo, cd into `lab-brian`, run `npm install`, brew install httpie if you do not already have it `brew install httpie`. 

Run `npm run start` to start the server.

Make POST/GET/DELETE/PUT requests to the server.

## Routes

#### `POST /api/car`

Create a new file with a JSON car object with the properties `model` and `make`.

```
http POST :3000/api/car make=honda model=civic
```

Throws an error if any of the requested properties are missing.


#### `GET /api/car/<car id>`

Retrieves a JSON car object with the properties `model` and `make` from your file system as requested by the <car id>.

```
http :3000/api/car/<car id>
```

Throws an error if the request parameter (id) is missing.

#### `DELETE /api/car/<car id>`

Deletes a specific car as requested by the <car id>.

```
http DELETE :3000/api/car/<car id>
```

If successful, a 204 status is returned.

Throws an error if the request parameter (id) is missing.


#### `PUT /api/car/<car id>`

Updates a JSON car object with the properties `model` and `make` from your file system as requested by the <car id>.

If successful, the car is returned with a 200 status.

If a request is made with a car id that is not found, a 404 status is returned.

## Tests

run `jest` to check tests.

#### POST

1. should return the car object and a 200 status code if there is no error.
2. should respond with a 404 status code if there is no request body.

#### GET

1. should return the car object and a 200 status code if there is no error.
2. should respond with a 404 status code if a request is made with an id that is not found.
3. should return a list of all cars and a status code of 200 if there is no error and no id provided.

#### DELETE

1. should return a 204 status code if there is no error.
2. should respond with a 404 status code if there is no parameter (id).

#### PUT

1. should update and return the updated car object along with a 200 status code if there is no error.
2. should respond with a 404 status code if there is no parameter (id).

## Contribute

You can totally contribute to this project if you want. Fork the repo, make some cool changes and then submit a PR.

## Credits

Initial codebase created by Code Fellows.

## License

MIT. Use it up!