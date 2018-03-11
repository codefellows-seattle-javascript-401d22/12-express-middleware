'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');
const debug = require('debug')('beer:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject(createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      let item = JSON.parse(data.toString());
      return item;
    })
    .catch( err => Promise.reject(createError(404, err)));
};
      
    

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');
  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( () => id)
    .catch( err => Promise.reject(createError(404, err.message)));
};

exports.availIDs = function(schemaName) {
  debug('availIDs');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
    .then( files => files.map(name => name.split('.json')[0]))
    .catch( err => Promise.reject(createError(404, err.message)));
};
