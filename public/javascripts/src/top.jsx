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

	componentDidMount: function() {
		 Events.scrollEvent.register('begin', function(to, element) {
			console.log("begin", arguments);
		});
		 
		Events.scrollEvent.register('end', function(to, element) {
			console.log("end", arguments);
		});
	},

	componentWillUnmount: function() {
		Events.scrollEvent.remove('begin');
		Events.scrollEvent.remove('end');
	},

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