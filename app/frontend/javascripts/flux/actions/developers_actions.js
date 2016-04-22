import DevelopersConstants from "flux/constants/developers_constants";
import HacktiveDispatcher from "flux/dispatchers/hacktive_dispatcher";

const DevelopersActions = {
  setDevelopers: function(args, callback){
    HacktiveDispatcher.dispatch({
      action: DevelopersConstants.DEVELOPERS_SET_DEVELOPERS,
      args: args,
      callback: callback
    })
  }
};

module.exports = DevelopersActions
