var DevelopersConstants = require("flux_root/constants/developers_constants");
var HacktiveDispatcher = require("flux_root/dispatchers/hacktive_dispatcher");

var DevelopersActions = {
  setDevelopers: function(args, callback){
    HacktiveDispatcher.dispatch({
      action: DevelopersConstants.DEVELOPERS_SET_DEVELOPERS,
      args: args,
      callback: callback
    })
  }
};

module.exports = DevelopersActions
