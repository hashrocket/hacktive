var React = require("react");
var ReactDOM = require("react-dom");
var UiConstants = require("js_root/flux/constants/ui");

// Developer List
var developers = [];
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
        developers = response
        self.forceUpdate()
      },
      type: "GET",
      url: "/developers"
    })
  },

  getInitialState: function(){
    return {
      developers: []
    }
  },

  renderDeveloperCards: function(){
    var activityLookup = {
      IssuesEvent: "Issue opened at",
      PullRequestEvent: "Pull request at",
      PushEvent: "Committed at",
      WatchEvent: "Starred at"
    };
    var filterRegex = new RegExp(this.props.filter, "gi");

    var filteredDevelopers = developers.filter(function(developer){
      return developer.name.match(filterRegex)
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
