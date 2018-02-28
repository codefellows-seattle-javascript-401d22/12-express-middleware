'use strict';

const request = require('superagent');
const Recipe = require('../model/recipe.js');
const url = 'http://localhost:3000';

require('jest');
require('../server.js');

const exampleRecipe = {
  name: 'Example Recipe',
  prepTime: '15 min',
  cookTime: '40 min',
  proteinType: 'n/a',
};

describe('Recipe Routes', function() {
  describe('GET: /api/recipe', function() {
    describe('with a valid id', function() {
      beforeEach( done => {
        Recipe.createRecipe(exampleRecipe)
          .then( recipe => {
            this.tempRecipe = recipe;
            done();
          })
          .catch( err => done(err) );
      });

      afterAll( done => {
        Recipe.deleteRecipe(this.tempRecipe.id)
          .then( () => done() )
          .catch( err => done(err) );
      });

      it('should return a recipe', done => {
        request.get(`${url}/api/recipe/${this.tempRecipe.id}`)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.id).toEqual(this.tempRecipe.id);
            expect(res.body.name).toEqual(this.tempRecipe.name);
            expect(res.body.prepTime).toEqual(this.tempRecipe.prepTime);
            expect(res.body.cookTime).toEqual(this.tempRecipe.cookTime);
            expect(res.body.proteinType).toEqual(this.tempRecipe.proteinType);
            done();
          });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404', done => {
          request.get(`${url}/api/recipe/123456789`)
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
  });

  describe('POST: /api/recipe', function() {
    describe('with a valid body', function() {
      afterEach( done => {
        if (this.tempRecipe) {
          Recipe.deleteRecipe(this.tempRecipe.id)
            .then( () => done())
            .catch( err => done(err));
        }
      });

      it('should return a recipe', done => {
        request.post(`${url}/api/recipe`)
          .send(exampleRecipe)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual(exampleRecipe.name);
            this.tempRecipe = res.body;
            done();
          });
      });
    });
  });
});