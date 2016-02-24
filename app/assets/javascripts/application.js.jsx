$(document).ready(function(){
	var App = React.createClass({
		componentDidMount: function(){
			this.fetch()
		},

		fetch: function(){
			var self = this;
			var params = {
				organization: 'hashrocket'
			};

			$.ajax({
				contentType: 'application/json',
				data: JSON.stringify(params),
				dataType: "json",
				success: function(response){
					if(response.fetched){
						alert("Comin out the Github oven!")
					}

					self.setState({
						developers: response.developers
					})
				},
				type: 'post',
				url: "/developers/fetch"
			})
		},

		getInitialState: function(){
			return {
				developers: []
			}
		},

		render: function(){
			var developers = this.state.developers

			return (
				<div id='app'>
					<h1>{'Get Hacktive'}</h1>
					{JSON.stringify(developers)}
				</div>
			)
		}
	})

	ReactDOM.render(
		<App/>,
		document.getElementById('hackers')
	)
})
