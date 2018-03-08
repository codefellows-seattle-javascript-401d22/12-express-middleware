##Installation
1. download this repo down to your local machine
2. cd into the directory and run the command </npm i > in your terminal to install the dependencies needed for this application
3. run the command </npm run start> or </node server.js> to start your server connection

##Endpoints
GET requests:
//with a proper weed id
localhost:3000/api/weed/:weedId

//for a list of all weed
localhost:3000/api/weed

POST requests:
//create a weed with a valid type and strain
localhost:3000/api/weed

PUT requests:
//edit a particular weed instance by adding a new type and strain 
localhost:3000/api/weed/:weedId

DELETE requests:
//delete a weed instance with the proper id
localhost:3000/api/weed/:weedId