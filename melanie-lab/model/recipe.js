'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('recipe:recipe.js');
const storage = require('../lib/storage.js');

const Recipe = module.exports = function(name, prepTime, cookTime, proteinType) {
  debug('Recipe constructor');

  if (!name) throw new createError(400, 'expected name');
  if (!prepTime) throw new createError(400, 'expected prep time');
  if (!cookTime) throw new createError(400, 'expected cook time');
  if (!proteinType) throw new createError(400, 'expected protein type');

  this.id = uuidv4();
  this.name = name;
  this.prepTime = prepTime;
  this.cookTime = cookTime;
  this.proteinType = proteinType;
};

Recipe.createRecipe = function(_recipe) {
  debug('createRecipe');

  try {
    let recipe = new Recipe(_recipe.name, _recipe.prepTime, _recipe.cookTime, _recipe.proteinType);
    return storage.createItem('recipe', recipe);
  } catch (err) {
    return Promise.reject(err);
  }
};

Recipe.fetchRecipe = function(id) {
  debug('fetchRecipe');
  return storage.fetchItem('recipe', id);
};

Recipe.updateRecipe = function(id, _recipe) {
  debug('updateRecipe');

  return storage.fetchItem('recipe', id)
    .then( recipe => {
      for (var prop in recipe) {
        if (prop === 'id') continue;
        if (_recipe[prop]) recipe[prop] = _recipe[prop];
      }
      return storage.createItem('recipe', recipe);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Recipe.deleteRecipe = function(id) {
  debug('deleteRecipe');
  return storage.deleteItem('recipe', id);
};

Recipe.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availableIDs('recipe');
};