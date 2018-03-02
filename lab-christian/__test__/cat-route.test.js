'use strict';

const request = require('superagent');
const Cat = require('../model/cat');
const url = 'http://localhost:3000';

require('jest');
require('../server');

const exampleCat = {
  name: 'superdopecat',
  color: 'rainbows'
};

describe('Cat Routes', function() {
  describe('GET: /api/cat/', function() {
    describe('with a valid id', function() {

      beforeEach( done => {
        Cat.create(exampleCat)
        .then( cat => {
          this.tempCat = cat;
          done();
        })
        .catch( err => done(err));
      });
      
      afterAll( done => {
        Cat.delete(this.tempCat.id)
        .then( () => done())
        .catch( err => done(err));
      });
      it('should return a cat', done => {
        request.get(`${url}/api/cat/${this.tempCat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(this.tempCat.id);
          expect(res.body.name).toEqual(this.tempCat.name);
          expect(res.body.color).toEqual(this.tempCat.color);
          done();
        });
      });
    });
      
    describe('with an invalid id', function() {
      it('should respond with a 404', done => {
        request.get(`${url}/api/cat/12312313`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
      });
    });
  });

  describe('POST: /api/cat', function() {
    describe('with a valid body', function() {
      afterEach( done => {
        if (this.tempCat) {
          Cat.delete(this.tempCat.id)
            .then( () => done())
            .catch( err => done(err));
        };
      });
      it('should return a new cat', done => {
        request.post(`${url}/api/cat`)
        .send(exampleCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(exampleCat.name);
          expect(res.body.color).toEqual(exampleCat.color);
          this.tempCat = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/cat', function() {
    describe('with a valid id and body', function() {
      beforeEach( done => {
        Cat.create(exampleCat)
          .then( cat => {
            this.tempCat = cat;
            done();
          })
          .catch( err => done(err))
      });

      afterEach( done => {
        if (this.tempCat) {
          Cat.delete(this.tempCat.id)
            .then( () => done())
            .catch (err => done(err));
        }
      });
      it('should update a note and return a new cat', done => {
        let updateCat = { name: 'newdopename', color: 'newrainbow' };
        request.put(`${url}/api/cat/${this.tempCat.id}`)
          .send(updateCat)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempCat.id);
            for (var prop in updateCat) {
              expect(res.body[prop]).toEqual(updateCat[prop]);
              done();
            }
          });
      });
    });
  });
});