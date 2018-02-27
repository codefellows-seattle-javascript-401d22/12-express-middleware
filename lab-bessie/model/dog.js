'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('dog:dog');
const storage = require('../lib/storage.js');

const Dog = module.exports = function(name, breed) {
  debug('Dog constructor');

  if(!name) throw new Error('expected name');
  if(!breed) throw new Error('expected breed');

  this.id = uuidv4();
  this.name = name;
  this.breed = breed;
};

Dog.createDog = function(_dog) {
  debug('createDog');
  
  try {
    let dog = new Dog(_dog.name, _dog.breed);
    return storage.createItem('dog', dog);
  } catch(err) {
    return Promise.reject(err);
  }
};

Dog.fetchDog = function(id) {
  debug('fetchDog');
  return storage.fetchItem('dog', id);
};

Dog.updateDog = function(id, _dog) {
  debug('updateDog');
  return storage.fetchItem('dog', id)
    .then(dog => {
      for(var prop in dog) {
        if(prop === 'id') continue;
        if(_dog[prop]) dog[prop] = _dog[prop];
      }
      return storage.createItem('dog', dog);
    })
    .catch(err => Promise.reject(createError(404, err.message)));
};

Dog.deleteDog = function(id) {
  debug('deleteDog');
  return storage.deleteItem('dog', id);
};

Dog.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('dog');
};