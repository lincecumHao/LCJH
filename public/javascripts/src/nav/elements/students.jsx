var React = require('react');
var ReactDOM = require('react-dom');
var Scroll  = require('react-scroll'); 
var Helpers = Scroll.Helpers;
var FileInput = require('react-file-input');

var students = React.createClass({

	getInitialState: function() {
		return {
			uploadfile:{} 
		};
	},

	_handelSubmit: function(e){
		var data = new FormData();
		data.append("studentList", this.state.uploadfile);
		console.log(data);
		$.ajax({
		    url : "./students/student_upload",
		    type: 'POST',
		    data: data,
		    cache : false,
		    processData: false,
        	contentType: false,
		}).done(function(response) {
		    console.log(response);
		});
		e.preventDefault();
		
		//ugly, TODO
		this.props.toResultElm();
	},

	_uploadFileSelected: function(e){
		// console.log();
		console.log(e.target.files[0]);
		this.setState({
			uploadfile: e.target.files[0]
		});
	},

	render: function() {
		return (
			<div id="students" className="no_padding">
				<div className="no_padding">
					<div className="student_upload_btn col-md-12">
						<h3>
							<p className="sub_title">學生志願上傳</p>
						</h3>
						<form ref="uploadForm" method="post" encType="multipart/form-data" onSubmit={this._handelSubmit}>
							<div className="form-group">
								<input type="file" data-input="false" className="filestyle" name="studentList" onChange={this._uploadFileSelected} />
							</div>
							<button type="submit" className="btn btn-primary btn-lg">上傳</button>
						</form>
					</div>
					<div className="students background-imgs"></div>
				</div>
			</div>
		);
	}
});
//
module.exports = Helpers.Element(students);

