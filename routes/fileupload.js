var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
}).single('studentList');
var fs = require('fs');

router.post('/student_upload', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
        }
        console.log(req.file.path);
        readStudentsList(req.file.path);
        res.json({
            id: 1
        });
    });
});

router.post('/student_upload', function(req, res, next) {
    res.json({
        id: 1
    });
});

function readStudentsList(path) {
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(path)
    });

    lineReader.on('line', function(line) {
        console.log('Line from file:', line);
    });
}

module.exports = router;
