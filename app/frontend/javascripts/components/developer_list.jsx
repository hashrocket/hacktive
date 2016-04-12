var moment = require("moment");
var React = require("react");
var ReactDOM = require("react-dom");

var DevelopersActions = require("flux_root/actions/developers_actions");
import DeveloperCard from "js_root/components/developer_card";
var DevelopersStore = require("flux_root/stores/developers_store");
var SearchStore = require("flux_root/stores/search_store");
var UiConstants = require("flux_root/constants/ui_constants");

var DeveloperList = React.createClass({
  componentDidMount: function(){
    var self = this;

    this.fetch()

    setInterval(function(){
      self.fetch()
    }, 5000)
  },

  fetch: function(){
    var self = this;

    $.ajax({
      contentType: "application/json",
      dataType: "json",
      success: function(response){
        DevelopersActions.setDevelopers(response)
      },
      type: "GET",
      url: "/developers"
    })
  },

  renderDeveloperCards: function(){
    var activityLookup = {
      IssuesEvent: "Issue opened at",
      PullRequestEvent: "Pull request at",
      PushEvent: "Committed at",
      WatchEvent: "Starred at"
    };
    var developers = DevelopersStore.getDevelopers();
    var query = SearchStore.getQuery();
    var filterRegex = new RegExp(query, "gi");

    var filteredDevelopers = developers.filter(function(developer){
      var matchString = `${developer.login} ${developer.name}`

      return matchString.match(filterRegex);
    })

    var developerCards = filteredDevelopers.map(function(developer, i){
      var mostRecentActivity = developer.activities[0];
      var timestamp = moment(
        mostRecentActivity.event_occurred_at
      ).format(UiConstants.DATETIME_FORMATS.FORMAT1);

      return (
        <DeveloperCard
          developer={developer}
          key={i}
        />
      )
    })

    return developerCards
  },

  render: function(){
    return (
      <div id="developers-list">
        <ul className="list">
          {this.renderDeveloperCards()}
        </ul>
      </div>
    )
  }
});

module.exports = DeveloperList
