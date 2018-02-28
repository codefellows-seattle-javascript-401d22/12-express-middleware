'use strict';

const request = require('superagent');
const Beer = require('../model/beer.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleBeer = {
  name: 'test beer',
  style: 'some style of beer',
};

describe('Beer Routes', function() {
  describe('GET: api/beer', function() {
    describe('with a valid id', function() {
      beforeEach( done => {
        Beer.createBeer(exampleBeer)
          .then( beer => {
            this.tempBeer = beer;
            done();
          }) 
          .catch( err => done(err));
      });
      afterAll( done => {
        Beer.deleteBeer(this.tempBeer.id)
          .then( () => done())
          .catch( err => done(err));
      });
      it('should return a note', done => {
        request.get(`${url}/api/beer/${this.tempBeer.id}`)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempBeer.id);
            expect(res.body.name).toEqual(this.tempBeer.name);
            expect(res.body.style).toEqual(this.tempBeer.style);
            done();
          });
      });
    });
    describe('with an invalid id', function() {
      it('should respond with a 404', done => {
        request.get(`${url}/api/beer/1234`)
          .end((err,res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
  describe('POST: api/beer', function() {
    describe('with a valid body', function() {
      afterEach( done => {
        if(this.tempBeer) {
          Beer.deleteBeer(this.tempBeer.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });
      it('should return a note', done => {
        request.post(`${url}/api/beer`)
          .send(exampleBeer)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(exampleBeer.name);
            expect(res.body.style).toEqual(exampleBeer.style);
            this.tempBeer = res.body;
            done();
          });
      });
    });
  });
  describe('PUT: /api/beer', function() {
    describe('with a valid id and body', function() {
      beforeEach( done => {
        Beer.createBeer(exampleBeer)
          .then( beer => {
            this.tempBeer = beer;
            done();
          })
          .catch( err => done(err));
      });
      afterEach( done => {
        if(this.tempBeer) {
          Beer.deleteBeer(this.tempBeer.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });
      it('should update a beer', done => {
        let updateBeer = {name: 'new beer', style: ' new style'};
        request.put(`${url}/api/beer/${this.tempBeer.id}`)
          .send(updateBeer)
          .end((err,res) => {
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempBeer.id);
            for( var prop in updateBeer) {
              expect(res.body[prop]).toEqual(updateBeer[prop]);
              done();
            }
          });
      });
    });
  });
  describe('DELETE: api/beer', function() {
    describe('with a valid id', function() {
      beforeEach( done => {
        Beer.createBeer(exampleBeer)
          .then( beer => {
            this.tempBeer = beer;
            done();
          }) 
          .catch( err => done(err));
      });
      it('should delete a note', done => {
        request.delete(`${url}/api/beer/${this.tempBeer.id}`)
          .end((err,res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(this.tempBeer.id);
            done();
          });
      });
    });
    describe('with an invalid id', function() {
      it('should respond with a 404', done => {
        request.delete(`${url}/api/beer/1234`)
          .end((err,res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
});
      
            
