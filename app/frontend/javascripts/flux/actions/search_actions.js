var SearchConstants = require("flux_root/constants/search_constants");
var HacktiveDispatcher = require("flux_root/dispatchers/hacktive_dispatcher");

var SearchActions = {
  setQuery: function(args, callback){
    HacktiveDispatcher.dispatch({
      action: SearchConstants.SEARCH_SET_QUERY,
      args: args,
      callback: callback
    })
  }
};

module.exports = SearchActions
