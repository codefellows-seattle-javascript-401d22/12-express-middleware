'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('cat:cat');
const storage = require('../lib/storage');

const Cat = module.exports = function(name, color) {
  debug('Cat construtor');

  if (!name) throw new Error('expected name');
  if (!color) throw new Error('expected color');
  this.id = uuidv4();
  this.name = name;
  this.color = color;
};

Cat.create = function(_cat) {
  debug('create a cat');
  try {
    let cat = new Cat(_cat.name, _cat.color);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  }
};

Cat.fetch = function(id) {
  debug('fetch a cat');
  return storage.fetchItem('cat', id);
};

Cat.update = function(id, _cat) {
  debug('update a cat');

  return storage.fetchItem('cat', id)
    .then( cat => {
      for (var prop in cat) {
        if (prop === 'id') continue;
        if (_cat[prop]) cat[prop] = _cat[prop];
      }
      return storage.createItem('cat', cat);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};


Cat.delete = function(id) {
  debug('delete a cat');
  return storage.deleteItem('cat', id);
};

Cat.fetchAll = function() {
  debug('fetch all cats');
  return storage.listAll('cats');
};