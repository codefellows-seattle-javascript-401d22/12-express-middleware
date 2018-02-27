'use strict';

const request = require('superagent');
const Dog = require('../model/dog.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleDog = {
  name: 'example name',
  breed: 'example breed',
};

describe('Dog Routes', function () {
  // GET tests start here
  describe('GET: /api/dog', function () {
    describe('with a valid id', function () {
      beforeEach(done => {
        Dog.createDog(exampleDog)
          .then(dog => {
            this.tempDog = dog;
            done();
          })
          .catch(err => done(err));
      });
      afterAll(done => {
        Dog.deleteDog(this.tempDog.id)
          .then(() => done())
          .catch(err => done(err));
      });

      it('should return a dog', done => {
        request.get(`${url}/api/dog/${this.tempDog.id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempDog.id);
            expect(res.body.name).toEqual(this.tempDog.name);
            expect(res.body.breed).toEqual(this.tempDog.breed);
            done();
          });
      });
    });

    describe('with an invalid id', function () {
      it('should respond with a 404', done => {
        request.get(`${url}/api/dog/123456789`)
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
  // GET tests end here

  // POST tests start here
  describe('POST: /api/dog', function () {
    describe('with a valid body', function () {
      afterEach(done => {
        if (this.tempDog) {
          Dog.deleteDog(this.tempDog.id)
            .then(() => done())
            .catch(err => done(err));
        }
      });

      it('should return a dog', done => {
        request.post(`${url}/api/dog`)
          .send(exampleDog)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(exampleDog.name);
            expect(res.body.breed).toEqual(exampleDog.breed);
            this.tempDog = res.body;
            done();
          });
      });
    });
  });
  // POST tests end here

  // PUT tests start here
  describe('PUT: /api/dog', function() {
    describe('with a valid id and body', function() {
      beforeEach(done => {
        Dog.createDog(exampleDog)
          .then(dog => {
            this.tempDog = dog;
            done();
          })
          .catch(err => done(err));
      });
      afterEach(done => {
        if(this.tempDog) {
          Dog.deleteDog(this.tempDog.id)
            .then(() => done())
            .catch(err => done(err));
        }
      });

      it('should update a dog and return a new dog', done => {
        let updateDog = {name: 'new name', breed: 'new breed'};
        request.put(`${url}/api/dog/${this.tempDog.id}`)
          .send(updateDog)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempDog.id);
            for(var prop in updateDog) {
              expect(res.body[prop]).toEqual(updateDog[prop]);
            }
            done();
          });
      });
    });
  });
  // PUT tests end here
});
