var React = require('react');

var associationForm = React.createClass({

	getInitialState: function() {
		return {
			name: "",
			teacherName: "",
			classRoom: "",
			maxStudentCap: 0,
			classRoomWhenRain: "",
			common: ""
		};
	},

	componentWillReceiveProps: function(nextProps) {
		if(nextProps.association.name){
			var association = nextProps.association;
			this.setState({
				name: association.name,
				teacherName: association.teacherName,
				classRoom: association.classRoom,
				maxStudentCap: association.maxStudentCap,
				classRoomWhenRain: association.classRoomWhenRain,
				common: association.common
			});
		}
	},

	_handleNameChange: function(e){
		this.setState({
			name: e.target.value
		});
	},

	_handleTeacherNameChange: function(e){
		this.setState({
			teacherName: e.target.value
		});
	},

	_handleClassRoomChange: function(e){
		this.setState({
			classRoom: e.target.value
		});
	},

	_handleMaxStudentCapChange: function(e){
		this.setState({
			maxStudentCap: e.target.value
		});
	},

	_handleClassRoomWhenRainChange: function(e){
		this.setState({
			classRoomWhenRain: e.target.value
		});
	},

	_handleCommonChange: function(e){
		this.setState({
			common: e.target.value
		});
	},

	_handleEdit: function(e){
		console.log(this.state);
		e.preventDefault();
	},

	render: function() {
		return (
			<form>
				<div className="form-group">
					<label>社團名稱</label>
					<input type="text" className="form-control" value={this.state.name} onChange={this._handleNameChange}/>
				</div>
				<div className="form-group">
					<label>教師</label>
					<input type="text" className="form-control" value={this.state.teacherName} onChange={this._handleTeacherNameChange}/>
				</div>
				<div className="form-group">
					<label>上課場地</label>
					<input type="text" className="form-control" value={this.state.classRoom} onChange={this._handleClassRoomChange}/>
				</div>
				<div className="form-group">
					<label>上課人數</label>
					<input type="number" className="form-control" value={this.state.maxStudentCap} onChange={this._handleMaxStudentCapChange}/>
				</div>
				<div className="form-group">
					<label>雨天場地</label>
					<input type="text" className="form-control" value={this.state.classRoomWhenRain} onChange={this._handleClassRoomWhenRainChange}/>
				</div>
				<div className="form-group">
					<label>備註</label>
					<textarea className="form-control" rows="3" value={this.state.common} onChange={this._handleCommonChange}></textarea>
				</div>
				<button type="submit" onClick={this._handleEdit} className={(this.props.association.name ? "btn btn-success" : "btn btn-primary")}>{(this.props.association.name ? "修改" : "新增")}</button>
			</form>
		);
	}

});

module.exports = associationForm;