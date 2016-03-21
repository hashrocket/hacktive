var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var HacktiveDispatcher = require("flux_root/dispatchers/hacktive_dispatcher");

var CHANGE_EVENT = "change";

var UiStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  dispatcherIndex: HacktiveDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {}

    return true; // No errors. Needed by promise in Dispatcher.
  }),

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = UiStore;
