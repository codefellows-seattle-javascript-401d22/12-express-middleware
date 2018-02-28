'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('weed:weed');
const storage = require('../lib/storage.js');

const Weed = module.exports = function(type, strain) {
  debug('Weed Constructor');

  if(!type) throw new Error('expected type');
  if(!strain) throw new Error('expected strain');

  this.id = uuidv4();
  this.type = type;
  this.strain = strain;
}

//static methods
Weed.createWeed = function(_weed) {
  debug('createWeed');
  try {
    let weed = new Weed(_weed.type, _weed.strain);
    return storage.createItem('weed', weed);
  } catch (err) {
    return Promise.reject(err);
  }
}

Weed.fetchWeed =  function(id) {
  debug('fetchWeed');
  return storage.fetchItem('weed', id);
}

Weed.updateWeed = function(id, _weed) {
  debug('updateWeed');

  return storage.fetchItem('weed', id) 
    .then( weed => {
      for(var prop in weed) {
        if(prop === id) continue;
        if(weed[prop]) weed[prop] = _weed[prop];

      }
      return storage.createItem('weed', weed);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
  }


Weed.smokeWeed = function(id) {
  debug('smokeWeed');
  return storage.deleteItem('weed', id);
}

Weed.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('weed')
}