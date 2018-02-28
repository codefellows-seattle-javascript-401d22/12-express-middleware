'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('recipe:recipe-router.js');
const Recipe = require('../model/recipe.js');
const recipeRouter = new Router();

recipeRouter.post('/api/recipe', jsonParser, function(req, res, next) {
  debug('POST: /api/recipe');

  Recipe.createRecipe(req.body)
    .then( recipe => res.json(recipe) )
    .catch( err => next(err) );
});

recipeRouter.get('/api/recipe/:id', function(req, res, next) {
  debug('GET: /api/recipe/:id');

  Recipe.fetchRecipe(req.params.id)
    .then( recipe => res.json(recipe))
    .catch( err => next(err));
});

recipeRouter.get('/api/recipe', function(req, res, next) {
  debug('GET: /api/recipe');

  Recipe.fetchIDs()
    .then( ids => res.json(ids))
    .catch( err => next(err));
});

recipeRouter.put('/api/recipe/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/recipe/:id');

  Recipe.updateRecipe(req.params.id, req.body)
    .then( recipe => res.json(recipe))
    .catch( err => next(err) );
});

module.exports = recipeRouter;