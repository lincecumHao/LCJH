var React = require('react');

var associationForm = React.createClass({

	getInitialState: function() {
		return {
			association:{} 
		};
	},

	render: function() {
		return (
			<form>
				<div className="form-group">
					<label>社團名稱</label>
					<input type="text" className="form-control" value={this.props.association.name}/>
				</div>
				<div className="form-group">
					<label>教師</label>
					<input type="text" className="form-control" value={this.props.association.teacherName}/>
				</div>
				<div className="form-group">
					<label>上課場地</label>
					<input type="text" className="form-control" value={this.props.association.classRoom}/>
				</div>
				<div className="form-group">
					<label>上課人數</label>
					<input type="number" className="form-control" value={this.props.association.maxStudentCap}/>
				</div>
				<div className="form-group">
					<label>雨天場地</label>
					<input type="text" className="form-control" value={this.props.association.classRoomWhenRain}/>
				</div>
				<div className="form-group">
					<label>備註</label>
					<textarea className="form-control" rows="3" value={this.props.association.common}></textarea>
				</div>
				<button type="submit" className="btn btn-success">修改</button>
			</form>
		);
	}

});

module.exports = associationForm;