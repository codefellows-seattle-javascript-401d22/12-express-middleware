'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('car:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('createItem');
  if(!schemaName) return Promise.reject(createError(400, new Error('expected schema name')));
  if(!item) return Promise.reject(createError(400, new Error('expected item')));

  let json = JSON.stringify(item);
  console.log('json', json);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then(() => item)
    .catch(err => Promise.reject(err));
};

exports.fetchItem = function(schemaName, id){
  debug('fetchItem');
  if(!schemaName) return Promise.reject(createError(400, new Error('expected schema name')));
  if(!id) return Promise.reject(createError(400, new Error('expected id')));
  
  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then(data => {
      try{
        let item = JSON.parse(data.toString());
        return item;
      } catch(err) {
        return Promise.reject(err);
      }
    }).catch(err => {
      if(err.code === 'ENOENT'){
        err = createError(404, new Error('route not found'));
      }
      return Promise.reject(err);
    });
};

exports.deleteItem = function(schemaName, id){
  debug('deleteItem');
  if(!schemaName) return Promise.reject(createError(400, new Error('expected schema name')));
  if(!id) return Promise.reject(createError(400, new Error('expected id')));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch(err => Promise.reject(createError(404, err.message)));
};

exports.listItemIds = function(schemaName){
  debug('listItemIds');
  return new Promise((resolve,reject) => {
    if(!schemaName) return reject(createError(400, new Error('expected schema name')));

    fs.readdirProm(`${__dirname}/../data/${schemaName}`)
      .then(files => files)
      .catch(err => reject(createError(404, err.message)));
  });
};
