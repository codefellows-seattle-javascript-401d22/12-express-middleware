'use strict';

const request = require('superagent');
const Car = require('../model/car.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleCar = {
  name: 'example name',
  content: 'example content',
};

describe('Car Routes', function() {
  describe('GET: /api/car', function() {
    describe('with a valid id', function() {
      beforeEach( done  => {
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
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempCar.id);
            expect(res.body.name).toEqual(this.tempCar.name);
            expect(res.body.content).toEqual(this.tempCar.content);
            done();
          });
      });

      describe('with a invalid id', function() {
        it('should respond with a 404', done => {
          request.get(`${url}/api/car/123456789`)
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
  });

  describe('POST: /api/car', function() {
    describe(' valid body', function() {
      afterEach( done => {
        if (this.tempCar) {
          Car.deleteCar(this.tempCar.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('return a car', done => {
        request.post(`${url}/api/car`)
          .send(exampleCar)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(exampleCar.name);
            expect(res.body.content).toEqual(exampleCar.content);
            this.tempCar = res.body;
            done();
          });
      });
    });
  });
  
  describe('PUT: /api/car', function() {
    describe('valid id and body', function() {
      beforeEach( done => {
        Car.createCar(exampleCar)
          .then( car => {
            this.tempCar = car;
            done();
          })
          .catch( err => done(err));
      });

      afterEach( done => {
        if (this.tempCar) {
          Car.deleteCar(this.tempCar.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('should return new car', done => {
        let updateCar = { name: 'new name', content: 'new content' };
        request.put(`${url}/api/car/${this.tempCar.id}`)
          .send(updateCar)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempCar.id);
            for (var prop in updateCar) {
              expect(res.body[prop]).toEqual(updateCar[prop]);
            }
            done();
          });
      });
    });
  });
});

