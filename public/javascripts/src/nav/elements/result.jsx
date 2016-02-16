var React = require('react');
var Scroll  = require('react-scroll'); 
var Helpers = Scroll.Helpers;

var result = React.createClass({

	render: function() {
		var text;
		var btn;
		if(this.props.resultPath){
			text = "成果下載"
			btn = <a href={this.props.resultPath} className="btn btn-primary btn-lg">下載</a>
		}else{
			text = "請先上傳學生清單"
			btn = "";
		}


		return (
			<div id="stu" className="no_padding">
				<div className="no_padding">
					<div className="student_upload_btn col-md-12">
						<h3>
							<p className="sub_title">{text}</p>
						</h3>
						{btn}
					</div>
					<div className="result background-imgs"></div>
				</div>
			</div>
		);
	}

});


module.exports = Helpers.Element(result);