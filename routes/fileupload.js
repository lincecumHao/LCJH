var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
}).single('studentList');
var fs = require('fs');
var XLSX = require('xlsx');
var xlsxWriter = require('xlsx-writestream');

var mongoose = require('mongoose');
var Association = mongoose.model('Association');
var Student = mongoose.model('Student');

// var students = readStudentsList('G:\\DownloadFile\\蘭州國中選社範例.xlsx', 'xlsx');
// generateResult(students);

router.post('/student_upload', function(req, res, next) {
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            res.json({
                status: 0
            });
        }

        var ext = getFileExt(req.file.originalname);
        if (ext != "xlsx" && ext != 'xls'){
            res.json({
                stauts: 0,
                msg: '僅接受xlsx, xls, csv'
            })
        }
        // Student.remove({}, function(){
        //     console.log('remove all documents');
        // });
        var students = readStudentsList(req.file.path, ext);
        // for(var i = 0 ; i < students.length; i++){
        //     var student = createStudent(students[i]);
        //     student.save();
        // }
        generateResult(students);
    });
});

router.post('/student_upload', function(req, res, next) {
    res.json({
        id: 1
    });
});

function writeOut(students){
    xlsxWriter.write('result/mySpreadsheet.xlsx', students, function (err) {
        if(err) console.log(err);
    });
}

function checkResult(students, associations){
    var unResultStudents = [];
    students.forEach(function(elm){
        if(elm.result == undefined){
            unResultStudents.push(elm);
        }
    });
    if(unResultStudents.length > 0){
        var unFullAssociation = [];
        associations.forEach(function(elm){
            if(!isAssociationFull(elm)){
                unFullAssociation.push(elm);
            }
        });

        console.log('unFullAssociation: ' + unFullAssociation.length );
        sutdents.push(unFullAssociation);
    }
    console.log('unResultStudents: ' + unResultStudents.length );

    writeOut(students);
}

function generateResult(students) {
    Association.find({available: true}, function(err, associations){
        //增加  目前選課人數
        associations = addCapProp(associations);

        for(var volunteer = 0; volunteer < 5; volunteer++){
            var volunteerKey = getVolunteerKey(volunteer);
            for(var i = 0; i < associations.length; i++){
                var association = associations[i];

                if(isAssociationFull(association)){
                    //先判斷社團是已滿
                    continue; 
                } 

                var wantStudents = [];
                var dontWantStudents = [];
                students.forEach(function(elm){
                    if(elm[volunteerKey] == association.name && elm.result == undefined){
                        wantStudents.push(elm);
                    }else{
                        dontWantStudents.push(elm);
                    }
                });
                if(wantStudents.length > 0 && wantStudents.length <= (association.maxStudentCap - association.cap)){
                    for(var k = 0; k < wantStudents.length; k++){
                        var student = wantStudents[k];
                        student.result = association.name;
                        wantStudents[k] = student;
                    }
                    association.cap = association.cap + wantStudents.length;
                }else if (wantStudents.length > 0 && wantStudents.length > (association.maxStudentCap - association.cap)) {
                    var successAry = generateRandomArray(association.maxStudentCap, wantStudents.length);
                    for(var j = 0; j < successAry.length; j++){
                        var studentIndex = successAry[j];
                        var student = wantStudents[studentIndex];
                        student.result = association.name;
                        wantStudents[studentIndex] = student;
                    }
                    association.cap = association.maxStudentCap;
                }
                associations[i] = association;
                students = wantStudents.concat(dontWantStudents);
            }
        }
        checkResult(students, associations);
    });
}

function generateRandomArray(maxCap, students){
    var randomAry = [];
    for(var i = 0; i < maxCap; i++){
        var randomInt = getRandomInt(0, students - 1);
        if(randomAry.indexOf(randomInt) != -1){
            i = i - 1;
        }else{
            randomAry.push(randomInt);
        }
    }
    return randomAry;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addCapProp(associations){
    var updataLst = [];
    for(var i = 0 ; i < associations.length; i++){
        var association = associations[i];
        association.cap = 0;
        updataLst.push(association);
    }
    return updataLst;
}

function isAssociationFull(association){
    return association.cap == association.maxStudentCap;
}

function getVolunteerKey(index){
    switch(index){
        case 0:
            return "第一志願";
        case 1:
            return "第二志願";
        case 2:
            return "第三志願";
        case 3:
            return "第四志願";
        case 4:
            return "第五志願";
        default:
            return "";
    }
}

function readStudentsList(path, ext) {

    if(ext == 'xlsx' || ext == 'xls'){
        var workbook = XLSX.readFile(path, {type:"binary"});
        return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    }else if(ext == 'csv'){

    // var lineReader = require('readline').createInterface({
    //     input: fs.createReadStream(path)
    // });

    // lineReader.on('line', function(line) {
    //     console.log('Line from file:', line);
    // });
    }
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

function createStudent(opt){
    return new Student(opt);
}

module.exports = router;
