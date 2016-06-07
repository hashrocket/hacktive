import React from "react";
import moment from "moment";
import "javascripts/global/class_extensions";

import UiConstants from "flux/constants/ui_constants";

const DeveloperActivity = React.createClass({
	getTimestamp: function(){
		const activity = this.props.activity;

		return (
			moment(activity.event_occurred_at)
			.format(UiConstants.DATETIME_FORMATS.FORMAT3)
		)
	},

	renderIssuesEvent: function(){
		const activity = this.props.activity;
    const payload = activity.payload;

		return (
			<li className="issue">
				<h2>
					<span>{`${payload.action.titlefy()} issue on `}</span>
					<a
						href={`https://github.com/${activity.repo_name}`}
						target="_blank"
					>
						{activity.repo_name}
					</a>
				</h2>

				<p>{payload.message}</p>
				<p className="timestamp">{this.getTimestamp()}</p>
			</li>
		);
	},

	renderPullEvent: function(){
		const activity = this.props.activity;
		const payload = activity.payload;

		return (
			<li className="pull">
				<h2>
					<span>{`${payload.action.titlefy()} pull request on `}</span>
					<a
						href={`https://github.com/${activity.repo_name}`}
						target="_blank"
					>
						{activity.repo_name}
					</a>
				</h2>

				<p>{payload.message}</p>
				<p className="timestamp">{this.getTimestamp()}</p>
			</li>
		);
	},

	renderPushEvent: function(){
		const activity = this.props.activity;
    const payload = activity.payload;

		const firstCommit = payload.commits[0] || {
			message: "No commit messages"
		};

		const description = firstCommit.message.split("\n\n")[0];

		return (
			<li className="push">
				<h2>
					<span>{"Pushed to "}</span>
					<a
						href={`https://github.com/${activity.repo_name}`}
						target="_blank"
					>
						{activity.repo_name}
					</a>
				</h2>

				<p>{description}</p>
				<p className="timestamp">{this.getTimestamp()}</p>
			</li>
		);
	},

  render: function(){
		const activity = this.props.activity;

    switch (activity.event_type) {
      case "IssuesEvent": {
				return this.renderIssuesEvent();
      }

      case "PushEvent": {
				return this.renderPushEvent();
      }

      case "PullRequestEvent": {
				return this.renderPullEvent();
      }
    }
  }
});

export default DeveloperActivity;
