import assign from "object-assign";
import DevelopersConstants from "flux/constants/developers_constants";
import { EventEmitter } from "events";
import HacktiveDispatcher from "flux/dispatchers/hacktive_dispatcher";
import UiStore from "flux/stores/ui_store";

let _developers = []

const DeveloperStore = assign({}, EventEmitter.prototype, {
  dispatcherIndex: HacktiveDispatcher.register(function(payload) {
    var action = payload.action;
    var args = payload.args;
    var callback = payload.callback;

    switch(action) {
      case DevelopersConstants.DEVELOPERS_SET_DEVELOPERS: {
        DeveloperStore.setDevelopers(args)

        UiStore.emitChange()
      }
    }

    return true;
  }),

  getDevelopers: function() {
    return _developers;
  },

  setDevelopers: function(developers) {
    _developers = developers

    return _developers;
  }
});

module.exports = DeveloperStore;