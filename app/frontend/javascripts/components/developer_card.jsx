import React, { PropTypes } from 'react';
import { get } from 'lodash';


const DeveloperCard = (props) => {
  const renderRecentActivity = () => {
    const activities = props.developer.activities;

    return activities.slice(0, 3).map((activity, i) => {
      const marshalledActivity = marshallActivity(activity);

      return (
        <li key={i} className="activity">
          <a
            className="repo"
            href={marshalledActivity.repoUrl}
            target="_blank"
          >
            <span className="octicon octicon-repo icon" />
            <span className="text">{marshalledActivity.repoName}</span>
          </a>

          <a
            className="message"
            href={marshalledActivity.activityUrl}
            target="_blank"
          >
            <span className="type">{marshalledActivity.type}</span>
            <span className="description">{marshalledActivity.description}</span>
            <div className="status">
              <span className="text">{marshalledActivity.action}</span>
              <span className={`indicator ${marshalledActivity.action}`} />
            </div>
          </a>
        </li>
      );
    });
  };

  const marshallActivity = (activity) => {
    var payload = activity.payload;
    var result = {
      activityUrl: activity.activity_url,
      repoName: activity.repo_name,
      repoUrl: `https://github.com/${activity.repo_name}`

    };

    switch (activity.event_type) {
      case 'IssuesEvent': {
        result.action = payload.action;
        result.description = payload.message;
        result.type = 'Issue';

        break;
      }

      case 'PullRequestEvent': {
        result.action = payload.action;
        result.description = payload.message;
        result.type = 'Pull Request';

        break;
      }

      case 'PushEvent': {
        result.type = 'Push';
        result.description = get(payload, 'commits[0].message', 'No commit messages').split('\n\n')[0];

        break;
      }
    }

    return result;
  };

  return (
    <div className="developer">
      <div className="details">
        <img
          className="avatar"
          src={`https://avatars.githubusercontent.com/u/${props.developer.id}`}
        />
        <div className="user">
          <span className="text name">{props.developer.name}</span>
          <span className="text username">@{props.developer.login}</span>
          <a
            href={`https://github.com/${props.developer.login}`}
            target="_blank"
          >
            {`github.com/${props.developer.login}`}
          </a>
        </div>
      </div>

      <ul className="activities">
        {renderRecentActivity()}
      </ul>
    </div>
  );
};

DeveloperCard.propTypes = {
  developer: PropTypes.object.isRequired,
};


export default DeveloperCard;


