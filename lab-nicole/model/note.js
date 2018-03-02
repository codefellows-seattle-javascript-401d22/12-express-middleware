'use strict';

const uuidv4 = require('uuid-v4');
const createError = require('http-errors');
const debug = require('debug')('note:note');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, content) {
  if (!name) throw new Error ('expected name');
  if (!content) throw new Error('expected content');

  this.id = uuidv4();
  this.name = name;
  this.content = content;
};

Note.createNote = function(_note) {
  debug('createNote');

  try {
    // this line constructs the new note object
    let note = new Note(_note.name, _note.content);
    // sends the constructed object to the storage to create an actual item in storage
    return storage.createItem('note', note);
  } catch(err) {
    return Promise.reject(err);
  }
};

Note.fetchNote = function(id) {
  debug('fetchNote');
  return storage.fetchItem('note', id);
};

Note.updateNote = function(id, _note) {
  debug('updateNote');

  return storage.fetchItem('note', id)
  // ??? why is this return statement here.
  // also why is this a promise rather than a try catch
    .then( note => {
      console.log('_note', note);
      for(var prop in note) {
        if (prop === 'id') continue;
        if (_note[prop]) note[prop] = _note[prop];
      }
      return storage.createItem('note', note);
    })
    .catch(err => Promise.reject(createError(404, err.message)));
  // ??? why no return statement here
};

Note.deleteNote = function(id) {
  debug('deleteNote');
  return storage.deleteItem('note', id);
};

Note.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('note');
};