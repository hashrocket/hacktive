import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import DevelopersActions from "flux/actions/developers_actions";
import DeveloperCard from "components/developer_card";
import DevelopersStore from "flux/stores/developers_store";
import SearchStore from "flux/stores/search_store";
import UiConstants from "flux/constants/ui_constants";

const DeveloperList = React.createClass({
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
