'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');
const debug = require('debug')('recipe:storage.js');

module.exports = exports = {};

exports.createItem = (schemaName, item) => {
  debug('createItem');

  if (!schemaName) throw new createError(400, 'expected schema name');
  if (!item) throw new createError(400, 'expected item');

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(err));
};

exports.fetchItem = (schemaName, id) => {
  debug('fetchItem');

  if (!schemaName) throw new createError(400, 'expected schema name');
  if (!id) throw new createError(400, 'expected id');

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try {
        return JSON.parse(data.toString());
      } catch (err) {
        return Promise.reject(err);
      }
    })
    .catch( err => Promise.reject(err));
};

exports.deleteItem = (schemaName, id) => {
  debug('deleteItem');

  if (!schemaName) throw new createError(400, 'expected schema name');
  if (!id) throw new createError(400, 'expected id');

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch( err => Promise.reject(createError(404, err.message)));
};

exports.availableIDs = schemaName => {
  debug('availableIDs');

  if (!schemaName) throw new createError(400, 'expected schema name');

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
    .then( files => files.map(name => name.split('.json')[0]))
    .catch( err => Promise.reject(createError(404, err.message)));
};