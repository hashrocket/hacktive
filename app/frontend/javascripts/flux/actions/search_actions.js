import SearchConstants from "flux/constants/search_constants";
import HacktiveDispatcher from "flux/dispatchers/hacktive_dispatcher";

const SearchActions = {
  setQuery: function(args, callback){
    HacktiveDispatcher.dispatch({
      action: SearchConstants.SEARCH_SET_QUERY,
      args: args,
      callback: callback
    })
  }
};

module.exports = SearchActions
