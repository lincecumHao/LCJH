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
		$.ajax({
		    url : "./students/student_upload",
		    type: 'POST',
		    data: data,
		    cache : false,
		    processData: false,
        	contentType: false,
		}).done(function(response) {
		    //this.props.toResultElm();
		    console.log(response);
		    this._JSONToCSVConvertor(response, "學生分類成果", true);

		    //this._JSONToCSVConvertor(response);
		    // this._DownloadJSON2CSV(response);

		}.bind(this));
		e.preventDefault();
	},

	_JSONToCSVConvertor: function (JSONData, ReportTitle, ShowLabel) {
		
	    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	    
	    var CSV = '';    
	    //Set Report title in first row or line
	    
	    CSV += ReportTitle + '\r\n\n';

	    //This condition will generate the Label/Header
	    if (ShowLabel) {
	        var row = "";
	        
	        //This loop will extract the label from 1st index of on array
	        for (var index in arrData[0]) {
	            
	            //Now convert each value to string and comma-seprated
	            row += index + ',';
	        }

	        row = row.slice(0, -1);
	        
	        //append Label row with line break
	        CSV += row + '\r\n';
	    }
	    
	    //1st loop is to extract each row
	    for (var i = 0; i < arrData.length; i++) {
	        var row = "";
	        
	        //2nd loop will extract each column and convert it in string comma-seprated
	        for (var index in arrData[i]) {
	            row += '"' + arrData[i][index] + '",';
	        }

	        row.slice(0, row.length - 1);
	        
	        //add a line break after each row
	        CSV += row + '\r\n';
	    }

	    if (CSV == '') {        
	        alert("Invalid data");
	        return;
	    }   
	    
	    //Generate a file name
	    var fileName = "MyReport_";
	    //this will remove the blank-spaces from the title and replace it with an underscore
	    fileName += ReportTitle.replace(/ /g,"_");   
	    console.log(CSV);
	    //Initialize file format you want csv or xls
	    var uri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(CSV);
	    
	    // Now the little tricky part.
	    // you can use either>> window.open(uri);
	    // but this will not work in some browsers
	    // or you will not get the correct file extension    
	    
	    //this trick will generate a temp <a /> tag
	    var link = document.createElement("a");    
	    link.href = uri;
	    
	    //set the visibility hidden so it will not effect on your web-layout
	    link.style = "visibility:hidden";
	    link.download = fileName + ".csv";
	    
	    //this part will append the anchor tag and remove it after automatic click
	    document.body.appendChild(link);
	    link.click();
	    document.body.removeChild(link);
	},

	_uploadFileSelected: function(e){
		// console.log();
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

