import assign from "object-assign";
import { EventEmitter } from "events";
import HacktiveDispatcher from "flux/dispatchers/hacktive_dispatcher";

const CHANGE_EVENT = "change";

const UiStore = assign({}, EventEmitter.prototype, {
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
