'use strict';

//https://facebook.github.io/jest/docs/en/api.html

const request = require('superagent');
const Weed = require('../model/weed.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleWeed = {
  type: 'example type', 
  strain: 'example strain',
};

describe('Weed Routes', function() {
  describe('GET: /api/weed', () => {
    describe('with a valid id', () => {
      beforeEach( done => {
        Weed.createWeed(exampleWeed)
          .then( weed => {
            this.tempWeed = weed;
            done();
          })
          .catch( err => done(err));
      });

      afterAll( done => {
        Weed.smokeWeed(this.tempWeed.id)
          .then( () => done())
          .catch( err => done(err));
      });

      it('should return weed', done => {
        request.get(`${url}/api/weed/${this.tempWeed.id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);  //these are BDD methods (expect) vs TDD start by writing tests first. in the future we'll do a hybrid of both
            expect(res.body.id).toEqual(this.tempWeed.id);
            expect(res.body.type).toEqual(this.tempWeed.type);
            expect(res.body.strain).toEqual(this.tempWeed.strain);
            done();
          });
      });
  
      describe('with an invalid id', function() {
        it('should respond with a 404', done => {
          request.get(`${url}/api/weed/123456789`)
            .end((err, res) => {
              expect(res.status).toEqual(404); 
              done();
            });
        });
      });
    });
  });
  
  describe('POST: /api/weed', function() {
    describe('with a valid body', function() {
      afterEach( done => {
        if(this.tempWeed) {
          Weed.smokeWeed(this.tempWeed.id)
            .then( () => done())
            .catch( err => done(err));
        }
        else {
          done();
        }
      });

      it('should return weed', done => {
        request.post(`${url}/api/weed`)
          .send(exampleWeed)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.type).toEqual(exampleWeed.type);
            expect(res.body.strain).toEqual(exampleWeed.strain);
            this.tempWeed = res.body;
            done();
          });
      });
    });
  });

  describe('PUT: /api/weed', function() {
    describe('with a valid id and body', function() {
      beforeEach( done => {
        Weed.createWeed(exampleWeed)
          .then( weed => {
            this.tempWeed = weed;
            done();
          })
          .catch( err => done(err));
      });

      afterEach( done => {
        if (this.tempWeed) {
          Weed.smokeWeed(this.tempWeed.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('should update weed and return new weed', done => {
        let updateWeed = { type: 'new type', strain: 'new strain' };
        console.log(this.tempWeed.id);
        request.put(`${url}/api/weed/${this.tempWeed.id}`)
          .send(updateWeed)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).toEqual(200);
            console.log('gdhdh', res.body);
            expect(res.body.id).toEqual(this.tempWeed.id);
            for (var prop in updateWeed) {
              expect(res.body[prop]).toEqual(updateWeed[prop]);
            }
            done();
          });
      });
    });
  });
});