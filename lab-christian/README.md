## Single Resource Express API

This application allows you to interact with cat objects in 4 different ways. 

CREATE a cat: `http POST :3000/api/cat` Making a post request to this route will instansiate a new cat object and store it in the filesystem. 

GET a cat: `http :3000/api/cat/:id` Making a get request with a specific ID will return the cat object it is associated with.

GET all cats: `http :3000/api/cat` Making a get request to to this route will return a list of all cat objects.

UPDATE a cat: `http PUT :3000/api/cat/:id` Making a put request with a specific ID with return the updated cat object.

DELETE a cat: `http DELETE :3000/api/cat:id` Making a put request with a specific ID will delete the cat object it is associated with. 