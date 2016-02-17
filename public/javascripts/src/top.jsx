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

	getInitialState: function() {
		return {};
	},

	_toResultElm: function(){
		$("html, body").animate({ scrollTop: $('#stu').offset().top }, 1000);
		this.setState({
			resultPath: "/result/result.xlsx",
			unFullAssocationPath: "/result/unFullAssociation.xlsx"
		});
	},

	render: function() {
		return (
			
			<div className="row">
				<Nav />
				<IndexElm name="index"/>
				<AssociationsElm name="associations"/>
				<StudentsElm name="students" 
					toResultElm = {this._toResultElm}
				/>
				<ResultElm name="result" 
					resultPath = {this.state.resultPath}
					unFullAssocationPath = {this.state.unFullAssocationPath}
				/>
			</div>
		);
	}
});

module.exports = Index;