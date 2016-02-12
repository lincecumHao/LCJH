var React = require('react');
var Scroll  = require('react-scroll'); 
var Helpers = Scroll.Helpers;

var index = React.createClass({

	render: function() {
		return (
			<div id="index">
				<h1 className="system_title">
					<p className="font">蘭州國中社團選課系統</p>
				</h1>
				<div className="index background-imgs"></div>
			</div>
		);
	}

});


module.exports = Helpers.Element(index);