var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
}).single('studentList');
var fs = require('fs');
var XLSX = require('xlsx');

router.post('/student_upload', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            res.json({
                status: 0
            });
        }

        var ext = getFileExt(req.file.originalname);
        if (ext != "xlsx" || ext != 'xls'){
            res.json({
                stauts: 0,
                msg: '僅接受xlsx, xls, csv'
            })
        }
        
        // console.log(req.file.originalname);
        readStudentsList(req.file.path, ext);
        // res.json({
        //     id: 1
        // });
    });
});

router.post('/student_upload', function(req, res, next) {
    res.json({
        id: 1
    });
});

function readStudentsList(path, ext) {

    if(ext == 'xlsx' || ext == 'xls'){
        var workbook = XLSX.readFile(path, {type:"binary"});
        console.log(workbook);
    }



    // var lineReader = require('readline').createInterface({
    //     input: fs.createReadStream(path)
    // });

    // lineReader.on('line', function(line) {
    //     console.log('Line from file:', line);
    // });
}

function getFileExt(filename){
    var extIndex = filename.lastIndexOf('.');
    var ext;
    if (extIndex != -1) 
    {
       ext= filename.substr(extIndex+1, filename.length);  //副檔名
    }
    return ext
}

module.exports = router;
