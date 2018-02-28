'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('beer:beer');
const storage = require('../lib/storage.js');

const Beer = module.exports = function(name, style) {
  debug('Beer constructor');

  if (!name) throw new Error('expected name');
  if (!style) throw new Error('expected style');

  this.id = uuidv4();
  this.name = name;
  this.style = style;
};

Beer.createBeer = function(_beer) {
  debug('createBeer');

  try {
    let beer = new Beer(_beer.name, _beer.style);
    return storage.createItem('beer', beer);
  } catch (err) {
    return Promise.reject(err);
  }
};

Beer.fetchBeer = function(id) {
  debug('fetchBeer');
  return storage.fetchItem('beer', id);
};

Beer.updateBeer = function(id, _beer) {
  debug('update beer');

  return storage.fetchItem('beer', id)
    .then( beer => {
      for ( var prop in beer) {
        if (prop === 'id') continue;
        if(_beer[prop]) beer[prop] = _beer[prop];
      }
      return storage.createItem('beer', beer);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Beer.deleteBeer = function(id) {
  debug('deleteBeer');
  
  return storage.deleteItem('beer', id);
};

Beer.fetchIDs = function(){
  debug('fetchIDs');
  
  return storage.availIDs('beer');
};
      
    