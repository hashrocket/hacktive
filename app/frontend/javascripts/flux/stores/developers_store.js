var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var HacktiveDispatcher = require('../dispatcher/hacktive_dispatcher');

var CHANGE_EVENT = 'change';

var _developers = []

var DevelopersStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  dispatcherIndex: HacktiveDispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch(action.actionType) {}

    return true; // No errors. Needed by promise in Dispatcher.
  }),

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getDevelopers: function() {
    return _developers;
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  setDevelopers: function(developers) {
    _developers = developers

    return _developers;
  }
});

module.exports = DevelopersStore;
