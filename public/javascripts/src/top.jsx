var React = require('react');

//Nav and Elements
var Nav = require('./nav/index.js').Nav;
var IndexElm = require('./nav/').Index;
var AssociationsElm = require('./nav/').Associations;
var StudentsElm = require('./nav/').Students;
var ResultElm = require('./nav/').Result;

//Scroll lib
var Scroll = require('react-scroll');
var Link = Scroll.Link;
var Element = Scroll.Element;
var Events = Scroll.Events;


var Index = React.createClass({

	render: function() {
		return (
			
			<div className="row">
				<Nav />
				<IndexElm name="index"/>
				<AssociationsElm name="associations"/>
				<StudentsElm name="students"/>
				<ResultElm name="result"/>
			</div>
		);
	}
});

module.exports = Index;