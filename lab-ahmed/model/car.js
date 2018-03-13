'use strict';

const uuidv4 = require('uuid/v4');
const createError = require('http-errors');
const debug = require('debug')('car:car');
const storage = require('../lib/storage.js');

const Car = module.exports = function(name, content){
  debug('Car constructor');


  if(!name) throw new Error('expected name');
  if(!content) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
};

Car.createCar = function(_car){
  debug('creatCar');

  try{
    let car = new Car(_car.name, _car.content);
    return storage.createItem('car', car);

  }catch(err){
    return Promise.reject(err);
  }
};
Car.fetchCar = function(id){
  debug('fetchCar');
  return storage.fetchItem('car', id);
};

Car.updateCar = function(id, _car){
  debug('updateCar');

  return storage.fetchItem('car', id)
    .then(car => {
      for(var prop in car){
        if(prop === 'id') continue;
        if(_car[prop])car [prop] = _car[prop];
      }
      return storage.createItem('car', car);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

Car.deleteCar = function(id){
  debug('deleteCar');
  return storage.deleteItem('car', id);
};

Car.fetchIds = function(){
  debug('fetchIds');
  return storage.availIdS('car');
};