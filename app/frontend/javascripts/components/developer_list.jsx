var moment = require("moment");
var React = require("react");
var ReactDOM = require("react-dom");

var DevelopersActions = require("flux_root/actions/developers_actions");
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
      return developer.login.match(filterRegex)
    })

    var developerCards = filteredDevelopers.map(function(developer, i){
      var mostRecentActivity = developer.activities[0];
      var timestamp = moment(
        mostRecentActivity.event_occurred_at
      ).format(UiConstants.DATETIME_FORMATS.FORMAT1);

      return (
        <li
          className="developer"
          key={i}
        >
          <table>
            <tbody>
              <tr>
                <td className="img-cell">
                  <img
                    className="avatar"
                    src={`https://avatars.githubusercontent.com/u/${developer.id}`}
                  />
                </td>

                <td className="text-cell">
                  {/* User */}
                  <div className="user">
                    <span className="text name">{developer.name}</span>
                    <span className="text username">{"@"+developer.login}</span>
                    {/*TODO: Finish*/}
                    {/*(<span>{developer.activity}</span>*/}
                  </div>

                  {/* Project */}
                  <div className="project">
                    <a
                      href={`https://github.com/${mostRecentActivity.repo_name}`}
                      target="_blank"
                    >
                      <span className="text project">
                        {mostRecentActivity.repo_name}
                      </span>
                    </a>
                  </div>

                  <div className="stats">
                    {/* Last Commit */}
                    <span className="text commit-datetime">
                      {`${activityLookup[mostRecentActivity.event_type]}: ${timestamp}`}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </li>
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
