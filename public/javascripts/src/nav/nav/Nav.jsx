var React = require('react');
var ReactDom = require('react-dom');
var $ = require('jquery');
//scroll lib
var Scroll  = require('react-scroll');
var Link    = Scroll.Link;

var Nav = React.createClass({

	getInitialState: function() {
		return {
			ulTop: {}
		};
	},

	componentDidMount: function() {
		window.addEventListener("resize", this._updateUlHeight);
		this._updateUlHeight();
	},

	componentWillUnmount: function() {
		window.removeEventListener("resize", this._updateUlHeight);
	},

	/**
	 *	let <ul> height always center of window height(consider the self width and height)
	 */
	_updateUlHeight: function(){
		var top = ($(window).height() / 2) - (ReactDom.findDOMNode(this).offsetWidth / 2);
		this.setState({
			ulTop:{
				top: top + "px"
			} 
		});
	},

	//$("html, body").animate({ scrollTop: $('#stu').offset().top }, 1000);

	render: function() {
		return (
			<div id="nav" className="nav" >
				<ul ref="ul">
					<li>
						<Link activeClass="active" to="index" spy={true} smooth={true} duration={500}>首頁</Link>
					</li>
					<li>
						<Link activeClass="active" to="associations" spy={true} smooth={true} duration={500}>社團</Link>
					</li>
					<li>
						<Link activeClass="active" to="students" spy={true} smooth={true} duration={500}>學生</Link>
					</li>
					<li>
						<Link ref="result" activeClass="active" to="result" spy={true} smooth={true} duration={500} onClick={this._test}>成果</Link>
					</li>
				</ul>
			</div>
		);
	}

});

module.exports = Nav;