var assign = require("object-assign");
var EventEmitter = require("events").EventEmitter;
var HacktiveDispatcher = require("flux_root/dispatchers/hacktive_dispatcher");
var SearchConstants = require("flux_root/constants/search_constants");
var UiStore = require("flux_root/stores/ui_store");

var _query = "";

var SearchStore = assign({}, EventEmitter.prototype, {
  dispatcherIndex: HacktiveDispatcher.register(function(payload) {
    var action = payload.action;
    var args = payload.args;
    var callback = payload.callback;

    switch(action) {
      case SearchConstants.SEARCH_SET_QUERY: {
        SearchStore.setQuery(args)

        UiStore.emitChange()
      }
    }

    return true; // No errors. Needed by promise in Dispatcher.
  }),

  getQuery: function() {
    return _query;
  },

  setQuery: function(query) {
    _query = query

    return _query;
  }
});

module.exports = SearchStore;
