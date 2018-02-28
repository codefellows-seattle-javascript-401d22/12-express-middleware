![cf](https://i.imgur.com/7v5ASc8.png) Lab 12: Single Resource Express API
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration 
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc** - contains the course linter configuratoin
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint
  * create a `start` script for running your server
  * create a `test` script for running your tests
* **server.js** - runs your application
* **lib/** - contains helper modules
* **model/** - contains resource model(s)
* **\_\_test\_\_/** - contains route tests
* **data** - contains your resource data

## Feature Tasks

##### Minimum Requirements

* create a single resource `express` API that can handle **GET**, **POST**, and **PUT** requests
* use the `http-errors` module to create `new Error`'s and associate them with a proper status code
* create an `error-middleware` module to handle errors and *use* it in your server file
* create a `cors-middleware` module that will allow for public use of your API
* create the `deleteItem` and `availIDs` methods and add them to your `storage` module
  * these methods should be used to delete a resource (`deleteItem`) and return an array of id's from persisted resource filenames (`availIDs`)
* create the `updateNote`, `fetchNote`, and `fetchIDs` static methods as part of your `Note` model

## Testing
* create a series of meaningful tests for the behavior of your **GET**, **POST**, and **PUT** routes - there is not a minimum (or maximum) number of tests to create...  use your best judgement and test anything/everything that feels like it needs to be tested within your routes!