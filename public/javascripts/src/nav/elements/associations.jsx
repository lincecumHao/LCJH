var React = require('react');
var $ = require('jquery');
var Scroll	= require('react-scroll'); 
var Helpers = Scroll.Helpers;

var AssociationItem = require('./associationItem.jsx');
var AssociationForm = require('./associationForm.jsx');

var associations = React.createClass({

	getInitialState: function() {
		return {
			associations: [],
			selectedAssociation: {}
		};
	},

	componentDidMount: function() {
		$.get( "associations/getAllAssociation", function( data ) {
			this.setState({
				associations: this._sortById(data) 
			});
		}.bind(this));
	},

	_handleClick: function(selectedAssociation){
		this.setState({
			selectedAssociation: selectedAssociation
		});
	},

	_sortById: function(array){
		return array.sort(function(after, before){
			return parseInt(after.id) - parseInt(before.id);
		});
	},

	render: function() {
		return (
			<div id="associations" className="no_padding">
				<div className="no_padding">
					<div className="association_list col-md-5">
						<h3>
							<p className="sub_title">社團列表</p>
						</h3>
						<div className="container-fluid as_table">
							<ul>
								{
									this.state.associations.map((association, key) => {
										return(
											<AssociationItem
												key={key}
												association = {association}
												itemClick={this._handleClick}
												associationName={association.name}
												maxAvaliable={association.maxStudentCap}
											/>
										)
									})
								}
							</ul>
						</div>
					</div>
					<div className="association_list col-md-5">
						<h3>
							<p className="sub_title">詳細資訊</p>
						</h3>
						<div className="container-fluid as_table">
							<AssociationForm association={this.state.selectedAssociation}/>
						</div>
					</div>
					<div className="associations background-imgs"></div>
				</div>
			</div>
		);
	}

});

module.exports = Helpers.Element(associations);

// <li className="association_item">童軍社	 (最大人數:12人)</li>