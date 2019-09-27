'use strict';

const request = require('superagent');
const Car = require('../model/car.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleCar = {
  make: 'example make',
  model: 'example model',
};

describe('Car routes', function() {
  describe('GET: /api/car', function() {
    describe('with a valid id', function() {

      beforeEach( done => {
        Car.createCar(exampleCar)
          .then( car => {
            this.tempCar = car;
            done();
          })
          .catch(err => done(err));
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
            expect(res.body.make).toEqual(this.tempCar.make);
            expect(res.body.model).toEqual(this.tempCar.model);
            done();
          });
      });

      describe('with no id', function() {
        it('should respond with a 200 status and a list of ids', done => {
          request.get(`${url}/api/car`)
            .end((err, res) => {
              expect(res.status).toEqual(200);
              done();
            });
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 error', done => {
          request.get(`${url}/api/car/242145`)
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
  });

  describe('POST: /api/car', function() {
    describe('with a valid req.body', function() {

      afterEach( done => {
        if (this.tempCar) {
          Car.deleteCar(this.tempCar.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('should return a car', done => {
        request.post(`${url}/api/car`)
          .send(exampleCar)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.make).toEqual(exampleCar.make);
            expect(res.body.model).toEqual(exampleCar.model);
            this.tempCar = res.body;
            done();
          });
      });
    });
  });

  describe('with an invalid req.body', function() {
    it('shoud respond with a 400 error', done => {
      request.post(`${url}/api/car`)
        .send( )
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('PUT: /api/car', function() {
    describe('with a valid id and body', function() {

      beforeEach( done => {
        Car.createCar(exampleCar)
          .then( car => {
            this.tempCar = car;
            done();
          })
          .catch( err => done(err));
      });

      afterEach( done => {
        if(this.tempCar) {
          Car.deleteCar(this.tempCar.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('should update a car and return the new car', done => {
        let updateCar = { make: 'new make', model: 'new model'};
        request.put(`${url}/api/car/${this.tempCar.id}`)
          .send(updateCar)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempCar.id);
            for( var prop in updateCar) {
              expect(res.body[prop]).toEqual(updateCar[prop]);
            }
            done();
          });
      });

      describe('with an invalid id', () => {
        it('should respond with a 404', done => {
          let updateCar = { make: 'new make bad id', model: 'new model bad id'};
          request.put(`${url}/api/car/123135325`)
            .send(updateCar)
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });

    });

  });

  describe('DELETE: /api/car', function() {
    describe('with valid id', function() {
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

      it('should delete a car', (done) => {
        request.delete(`localhost:3000/api/car/${this.tempCar.id}`)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(204);
            console.log(res.text);
            done();
          });
      });


      describe('DELETE: /api/car', () => {
        it('should not delete and return a 400 error', (done) => {
          request.delete('localhost:3000/api/car')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });

    });
  });


});