$(document).ready(function(){
	var HacktiveApp = React.createClass({
		componentDidMount: function(){
			this.fetch()
		},

		fetch: function(){
			var self = this;

			$.ajax({
				contentType: 'application/json',
				dataType: 'json',
				success: function(response){
					self.setState({
						developers: response
					})
				},
				type: 'GET',
				url: '/developers'
			})
		},

		getInitialState: function(){
			return {
				developers: []
			}
		},

		renderDeveloperCards: function(){
			var developers = this.state.developers;

			var developerCards = developers.map(function(developer, i){
				return (
					<li key={i}>
						{developer.name+'---'+developer.first_activity_timestamp}
					</li>
				)
			})

			return developerCards
		},

		render: function(){
			return (
				<ul>
					{this.renderDeveloperCards()}
				</ul>
			)
		}
	})

	ReactDOM.render(
		<HacktiveApp/>,
		document.getElementById('hacktive')
	)
})
