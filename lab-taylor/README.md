# Single-resource API

This is a simple, single-resource API utilizing a RESTful  architectural style. It can perform CRUD functions at the route `localhost:3000/api/beer`. PUT and DELETE functions will need the id of the object passd into the query string, it should look like `localhost:3000/api/:beerId`

### Beer Constructor 

The beer contructor accepts `{ name: <beername>, style:<beerstyle>}`, and instaniates a beer object which will be stored in the local machines file system. 

### Dependencies 

This API uses a several dependencies, most of them only for the dev environment.**morgan**, **debug** ,**bluebird**, **http-errors**, **body-parser**, **express**, **uuid**, **superagent**, and **jest**(for testing). Run `npm i` to download them before running the server.
