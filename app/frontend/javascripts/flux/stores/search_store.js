import assign from "object-assign";
import { EventEmitter } from "events";
import HacktiveDispatcher from "flux/dispatchers/hacktive_dispatcher";
import SearchConstants from "flux/constants/search_constants";
import UiStore from "flux/stores/ui_store";

let _query = "";

const SearchStore = assign({}, EventEmitter.prototype, {
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
