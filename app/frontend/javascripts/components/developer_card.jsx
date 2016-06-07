import React from "react";
import moment from "moment";

import UiConstants from "flux/constants/ui_constants";

import DeveloperActivity from "components/developer_activity";

const DeveloperCard = React.createClass({
  renderActivities: function(){
    const developer = this.props.developer;
    const activities = developer.activities;

    return activities.slice(0, 3).map((activity, i)=>{
      return (
				<DeveloperActivity
					activity={activity}
					key={i}
				/>
			);
    });
  },

  render: function(){
    const developer = this.props.developer;
		const developerGithubUrl = `https://github.com/${developer.login}`;

    return (
      <article>
				<header>
					<figure>
						<a
							href={developerGithubUrl}
							target="_blank"
						>
							<img
								alt={developer.name}
								src={`https://avatars.githubusercontent.com/u/${developer.id}`}
							/>
						</a>
					</figure>

					<div className="name_handle">
						<div className="centered_items">
							<h1>
								<a
									href={developerGithubUrl}
									target="_blank"
								>
									{developer.name}
								</a>
							</h1>

							<a
								className="github_button"
								href={developerGithubUrl}
								target="_blank"
							>
								<i className="fa fa-github"/>
								<span>{developer.login}</span>
							</a>
						</div>
					</div>
				</header>

				<ul>
					{this.renderActivities()}
				</ul>
      </article>
    );
  }
});

export default DeveloperCard;
