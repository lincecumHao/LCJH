var React = require('react');
var Scroll  = require('react-scroll'); 
var Helpers = Scroll.Helpers;

var result = React.createClass({

	render: function() {
		return (
			<div className="result background-imgs"/>
		);
	}

});


module.exports = Helpers.Element(result);