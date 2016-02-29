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

		render: function(){
			var developers = JSON.stringify(this.state.developers);

			return (
				<div>
					{developers}
				</div>
			)
		}
	})

	ReactDOM.render(
		<HacktiveApp/>,
		document.getElementById('hacktive')
	)
})
