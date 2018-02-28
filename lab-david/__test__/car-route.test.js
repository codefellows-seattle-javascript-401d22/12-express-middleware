'use strict';

const request = require('superagent');
const Car = require('../model/car.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleCar = {
  make: 'example make',
  model: 'example model',
  year: 1980,
};

describe('Car Routes', function(){
  describe('GET: /api/car', function(){
    beforeEach( done => {
      Car.createCar(exampleCar)
        .then( car => {
          this.tempCar = car;
          done();
        })
        .catch( err => done(err));
    });

    afterAll( done => {
      Car.deleteCar(this.tempCar.id)
        .then( () => done())
        .catch( err => done(err));
    });

    it('should return a car', done => {
      request.get(`${url}/api/car/${this.tempCar.id}`)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(this.tempCar.id);
          expect(res.body.make).toEqual(this.tempCar.make);
          expect(res.body.model).toEqual(this.tempCar.model);
          expect(res.body.year).toEqual(this.tempCar.year);
          done();
        });
    });

    describe('with an invalid id', function(){
      it('should respond with a 404', done => {
        request.get(`${url}/api/note/123456789`)
          .end((err,res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });

  describe('POST: /api/car/', function(){
    describe('with a valid body', function(){
      afterEach( done => {
        if(this.tempCar){
          Car.deleteCar(this.tempCar.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('should return a car', done => {
        request.post(`${url}/api/car`)
          .send(exampleCar)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.make).toEqual(exampleCar.make);
            expect(res.body.model).toEqual(exampleCar.model);
            expect(res.body.year).toEqual(exampleCar.year);
            done();
          });
      });
    });
  });
});