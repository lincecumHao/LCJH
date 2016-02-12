var React = require('react');

var AssociationItem = React.createClass({

	_handleSelect: function(){
		this.props.itemClick(this.props.association);
	},

	render: function() {
		return (
			<li className="row association_item" onClick={this._handleSelect}>
				<div >
					<div className="col-md-6">{this.props.associationName}</div>
    				<div className="col-md-6"><span className="pull-right">(最大人數:{this.props.maxAvaliable}人)</span></div>
				</div>
			</li>
		);
	}

});

module.exports = AssociationItem;