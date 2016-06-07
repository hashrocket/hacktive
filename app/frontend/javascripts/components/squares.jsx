import React from "react";
import ReactDOM from "react-dom";

const Squares = React.createClass({
  render: function(){
		const count = this.props.count;
		const squares = [];

		for(let i=0; i<count; i++){
			squares.push(<li key={i}/>);
		}

		return (
			<ul className="squares">
				{squares}
			</ul>
		);
  }
});

module.exports = Squares
