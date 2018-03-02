## Single Resource Express API

This application writes and stores files to the file system. This application is a single resource API with custom cors and error handling middleware. The node modules it utilizes are debug, http-errors, fs, bluebird, morgan, uuid-v4, superagent, and express. 

The app creates and stores items in objects based on their schema, and writes them to files on your file system. For example, this app specifically has instances of note objects. Each note object must be instantiated with 2 properties in order to run (name, content) and it will be auto-assigned an ID using uuid-v4.

In order to use this app, the server must be started up. In order to utilize the debug middleware, you must run the server from the terminal using the command ```npm run start```.

Once the server has started up, you should see the message "server up: ${PORT}" with the port that your server is running on. 

### POST /api/note/

To make a POST request, in the terminal type:

```http POST :3000/api/note name={name} content={content}```

The ID will auto-generate and be attached to the object for you. If a valid request is made, the server will respond with a __200__ and the response body.
- If an invalid request body is provided, the server will respond with a __400__ or 'bad request' error. 

### GET /api/note/id?={id}

To make a GET request for a specific note, in the terminal type:

``` http :3000/api/note id={id} ``` or ```http:3000/api/note/id=?{id}```

with the specific ID for the note you would like to retrieve. When the note has been retrieved, the server will respond with a status of __200__ and the response body.
- If no ID is provided, the server will respond with a __400__ or 'bad request' error.
- If an invalid ID is provided, the server will respond with a __404__ or 'not found' error.

### DELETE /api/note/id?={id}

To make a DELETE request for a specific note, in the terminal type:

``` http :3000/api/note id={id}``` or ```http:3000/api/note/id=?{id}```

with the specific ID of the note you would like to delete. When the note is deleted, the server will respond with a __204__ status code, meaning the note has been successfully deleted.
- If an invalid ID is provided, the server will respond with a __400__ or 'bad request' error.