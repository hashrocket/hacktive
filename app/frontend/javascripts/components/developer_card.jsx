import React, { PropTypes } from 'react';
import { values } from 'lodash';

const DeveloperCard = (props) => {
  const renderRecentActivity = () => {
    const activities = props.developer.activities;
    console.log(activities);

    return activities.slice(0, 3).map((activity, i) => {
      const marshalledActivity = marshallActivity(activity);

      return (
        <li key={i} className="activity">
          <span className="repo">
            <a
              className="repo-url"
              href={marshalledActivity.repoUrl}
              target="_blank"
            >
              <span className="octicon octicon-repo icon" />
              <span className="text">{marshalledActivity.repoName}</span>
            </a>
          </span>
          <span className="type">{marshalledActivity.type}</span>
          <span className="description">{marshalledActivity.description}</span>
          <span className="activity-url">
            <a
              href={marshalledActivity.url}
              target="_blank"
            >
              <i className="fa fa-external-link-square icon" aria-hidden="true"></i>
            </a>
          </span>
        </li>
      );
    });
  };

  const marshallActivity = (activity) => {
    var result = {
      repoName: activity.repo_name,
      repoUrl: `https://github.com/${activity.repo_name}`

    };

    switch (activity.event_type) {
      case 'PushEvent': {
        result.type = 'Push';
        result.description = values(activity.payload)[0];
        break;
      }

      case 'PullRequestEvent': {
        result.type = 'Pull Request';
        result.description = 'test';
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


