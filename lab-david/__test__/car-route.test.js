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
  describe('with valid id', function(){
    describe('GET: /api/car', function(){
      beforeAll( done => {
        Car.createCar(exampleCar)
          .then( car => {
            this.tempCar = car;
            done();
          })
          .catch( err => done(err));
      });

      afterAll( done => {
        console.log(this.tempCar.id);
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
    });
  });
  describe('with an invalid id', function(){
    it('should respond with a 404', done => {
      request.get(`${url}/api/car/123456789`)
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
      if(this.carId){
        Car.deleteCar(this.carId)
          .then( () => done())
          .catch( err => done(err));
      }
    });

    it('should return a car', done => {
      request.post(`${url}/api/car/`)
        .send(exampleCar)
        .end((err,res) => {
          if(err) return done(err);
          this.carId = res.body.id;
          console.log('this.carId', this.carId);
          expect(res.status).toEqual(200);
          expect(res.body.make).toEqual(exampleCar.make);
          expect(res.body.model).toEqual(exampleCar.model);
          expect(res.body.year).toEqual(exampleCar.year);
          done();
        });
    });
  });
});

describe('PUT: /api/car/:carId', function(){
  describe('with a valid id', function(){
    this.newCar = {
      make: 'new make',
      model: 'new model',
      year: 1990,
    };

    beforeAll(done => {
      Car.createCar(exampleCar)
        .then(car => {
          this.tempCar = car;
          done();
        })
        .catch(err => done(err));
    });

    afterAll(done => {
      Car.deleteCar(this.tempCar.id)
        .then( () => done())
        .catch(err => done(err));
    });

    it('should return an updated car', done => {
      request.put(`${url}/api/car/${this.tempCar.id}`)
        .send(this.newCar)
        .end((err,res) => {
          expect(res.body.id).toEqual(this.tempCar.id);
          expect(res.body.make).toEqual(this.newCar.make);
          expect(res.body.model).toEqual(this.newCar.model);
          expect(res.body.year).toEqual(this.newCar.year);
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('with an invalid id', function(){
    this.newCar = {
      make: 'new make',
      model: 'new model',
      year: 1990,
    };

    it('should return a 404: Not Found', done => {
      request.put(`${url}/api/car/129381`)
        .send(this.newCar)
        .end((err,res) => {
          expect(res.status).toEqual(404);
          expect(err.status).toEqual(404);
          expect(err.message).toEqual('Not Found');
          done();
        });
    });
  });
});

// describe('DELETE: /api/car/:carId', function(){
//   describe('with a valid file path', function(){
//     beforeEach(done => {
//       Car.createCar(exampleCar)
//         .then(car => {
//           this.tempCar = car;
//           done();
//         })
//         .catch(err => done(err));
//     });

//     it('should return status 204', done => {
//       request.delete(`${url}/api/car/${this.tempCar.id}`)
//         .end((err,res) => {
//           expect(res.status).toEqual(204);
//           done();
//         });
//     });
//   });
// });