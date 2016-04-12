var assign = require("object-assign");
var DevelopersConstants = require("flux_root/constants/developers_constants")
var EventEmitter = require("events").EventEmitter;
var HacktiveDispatcher = require("flux_root/dispatchers/hacktive_dispatcher");
var UiStore = require("flux_root/stores/ui_store");

var _developers = []

var DevelopersStore = assign({}, EventEmitter.prototype, {
  dispatcherIndex: HacktiveDispatcher.register(function(payload) {
    var action = payload.action;
    var args = payload.args;
    var callback = payload.callback;

    switch(action) {
      case DevelopersConstants.DEVELOPERS_SET_DEVELOPERS: {
        DevelopersStore.setDevelopers(args)

        UiStore.emitChange()
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  }),

  getDevelopers: function() {
    return _developers;
  },

  setDevelopers: function(developers) {
    _developers = developers

    return _developers;
  }
});

module.exports = DevelopersStore;
