$(document).ready(function(){
	var App = React.createClass({
		render: function(){
			return (
				<div id='app'>
					<h1>{'Hello World!'}</h1>
				</div>
			)
		}
	})

	ReactDOM.render(
		<App/>,
		document.getElementById('hackers')
	)
})
