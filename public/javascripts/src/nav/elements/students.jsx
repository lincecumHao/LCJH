var React = require('react');
var Scroll  = require('react-scroll'); 
var Helpers = Scroll.Helpers;

var students = React.createClass({

	componentConfig: {
	    iconFiletypes: ['.jpg', '.png', '.gif'],
	    showFiletypeIcon: true,
	    postUrl: '/uploadHandler'
	},

	render: function() {
		return (
			<div id="students" className="no_padding">
				<div className="no_padding">
					<div className="student_upload_btn col-md-12">
						<h3>
							<p className="sub_title">學生志願上傳</p>
						</h3>
						<form action="/students/student_upload" method="post" encType="multipart/form-data">
							<div className="form-group">
								<label>學生清單選擇</label>
								<input type="file" name="studentList"/>
							</div>
							<button type="submit" className="btn btn-primary btn-lg">上傳(*.csv)</button>
						</form>
					</div>
					<div className="students background-imgs"></div>
				</div>
			</div>
		);
	}
});


module.exports = Helpers.Element(students);

