var React = require('react');
var Scroll  = require('react-scroll'); 
var Helpers = Scroll.Helpers;

var result = React.createClass({

	_downloadStudentsResult:function (e) {
		
		this._JSONToCSVConvertor(this.props.studentResult, "學生分類成果", true);
		e.preventDefault();
	},

	_downloadUnFullAssocation: function(e){
		
		this._JSONToCSVConvertor(this.props.unFullAssocationResult, "未滿員社團", true);
		e.preventDefault();
	},

	_JSONToCSVConvertor: function (JSONData, ReportTitle, ShowLabel) {
		
	    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
	    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
	    
	    var CSV = '';    
	    //Set Report title in first row or line
	    
	    //CSV += ReportTitle + '\r\n\n';

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
	    var fileName = "";
	    //this will remove the blank-spaces from the title and replace it with an underscore
	    fileName += ReportTitle.replace(/ /g,"_");   
	    
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

	render: function() {
		var text;
		var btn;
		var unFullAssocationTxt;
		var unFullAssocationBtn;
		console.log(this.props.studentResult);
		if(this.props.studentResult){
			text = "成果下載";
			btn = <a onClick={this._downloadStudentsResult} className="btn btn-primary btn-lg">下載</a>
			unFullAssocationTxt = "尚未滿員社團清單";
			unFullAssocationBtn = <a onClick={this._downloadUnFullAssocation}className="btn btn-primary btn-lg">下載</a>
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
						<h3>
							<p className="sub_title">{unFullAssocationTxt}</p>
						</h3>
						{unFullAssocationBtn}
					</div>
					<div className="result background-imgs"></div>
				</div>
			</div>
		);
	}

});


module.exports = Helpers.Element(result);