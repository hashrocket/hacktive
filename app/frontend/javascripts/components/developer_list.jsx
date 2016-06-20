import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

import DeveloperStore from "flux/stores/developer_store";
import DevelopersActions from "flux/actions/developers_actions";
import SearchStore from "flux/stores/search_store";
import UiConstants from "flux/constants/ui_constants";

import DeveloperCard from "components/developer_card";

const DeveloperList = React.createClass({
  componentDidMount: function(){
    const self = this;

    this.fetch()

    setInterval(function(){
      self.fetch()
    }, 5000)
  },

  fetch: function(){
    $.ajax({
      contentType: "application/json",
      dataType: "json",
      success: function(response){
        DevelopersActions.setDevelopers(response)
      },
      type: "GET",
      url: "/"
    })
  },

  renderDeveloperCards: function(){
    const activityLookup = {
      IssuesEvent: "Issue opened at",
      PullRequestEvent: "Pull request at",
      PushEvent: "Committed at",
      WatchEvent: "Starred at"
    };
    const developers = DeveloperStore.getDevelopers();
    const query = SearchStore.getQuery();
    const filterRegex = new RegExp(query, "gi");

    const filteredDevelopers = developers.filter(function(developer){
      const matchString = `${developer.login} ${developer.name}`

      return matchString.match(filterRegex);
    })

    const developerCards = filteredDevelopers.map(function(developer, i){
      const mostRecentActivity = developer.activities[0];

      return (
        <DeveloperCard
          developer={developer}
          key={i}
        />
      );
    })

    return developerCards;
  },

  render: function(){
    return (
      <section>
				{this.renderDeveloperCards()}
      </section>
    );
  }
});

export default DeveloperList;
