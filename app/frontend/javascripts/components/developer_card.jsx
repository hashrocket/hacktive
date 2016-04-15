import moment from 'moment';
import React, { PropTypes } from 'react';
import { get } from 'lodash';

import UiConstants from 'flux_root/constants/ui_constants';

const DeveloperCard = React.createClass({
  marshallActivity: function(activity){
    const payload = activity.payload;
    const time = (
      moment(activity.event_occurred_at)
      .format(UiConstants.DATETIME_FORMATS.FORMAT1)
    );

    let result = {
      activityUrl: activity.activity_url,
      formattedTime: time,
      repoName: activity.repo_name,
      repoUrl: `https://github.com/${activity.repo_name}`
    };

    switch (activity.event_type) {
      case 'IssuesEvent': {
        result.action = payload.action;
        result.description = payload.message;
        result.type = 'Issue';
        result.typeIcon = `octicon-issue-${payload.action}`;

        break;
      }

      case 'PullRequestEvent': {
        result.action = payload.action;
        result.description = payload.message;
        result.type = 'Pull Request';
        result.typeIcon = 'octicon-git-pull-request';

        break;
      }

      case 'PushEvent': {
        result.description = get(payload, 'commits[0].message', 'No commit messages').split('\n\n')[0];
        result.type = 'Push';
        result.typeIcon = 'octicon-git-commit';

        break;
      }
    }

    return result;
  },

  renderRecentActivity: function(){
    const developer = this.props.developer;
    const activities = developer.activities;

    return activities.slice(0, 3).map((activity, i)=>{
      const marshalledActivity = this.marshallActivity(activity);

      if(marshalledActivity.action){
        var action = (
          <div className={`action ${marshalledActivity.action}`} />
        )
      }

      return (
        <li key={i} className="activity">
          <div className="info">
            <a
              className="repo"
              href={marshalledActivity.repoUrl}
              target="_blank"
            >
              <span className="octicon octicon-repo icon" />
              <span className="text">{marshalledActivity.repoName}</span>
            </a>
            <a
              className="description"
              href={marshalledActivity.activityUrl}
              target="_blank"
            >
              <div className="status">
                <div className="type">
                  <span className={`octicon icon ${marshalledActivity.typeIcon}`} />
                  <span className="text">{marshalledActivity.type}</span>
                </div>

                {action}
              </div>

              <span className="message">{marshalledActivity.description}</span>
            </a>
          </div>

          <div className="time">
            <span className="icon octicon octicon-clock" />
            <span className="text">{marshalledActivity.formattedTime}</span>
          </div>
        </li>
      )
    })
  },

  render: function(){
    const developer = this.props.developer;

    return (
      <div className="developer">
        <div className="details">
          <img
            className="avatar"
            src={`https://avatars.githubusercontent.com/u/${developer.id}`}
          />
          <div className="user">
            <span className="text name">{developer.name}</span>
            <span className="text username">{`@${developer.login}`}</span>
            <a
              href={`https://github.com/${developer.login}`}
              target="_blank"
            >
              {`github.com/${developer.login}`}
            </a>
          </div>
        </div>

        <ul className="activities">
          {this.renderRecentActivity()}
        </ul>
      </div>
    )
  }
});

export default DeveloperCard;


