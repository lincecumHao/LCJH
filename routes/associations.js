var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var association = mongoose.model('Association');

var associationList;

router.get('/getAllAssociation', function(req, res, next) {
    association.find({available: true}, function(err, association){
    	associationList = association;
    	res.json(association);
    });
});

router.put('/addAssociation', function(req, res, next) {
    var association = createAssociation(req.body);
    var status = 1;
    association.save(function(err, association){
    	if(err){
    		console.log(err);
    		stauts = 0;
    		return;	
    	} 
    	associationList.push(association);
    });
    res.json({
    	status: status
	});
});

router.delete('/delAssociation', function(req, res, next) {
    console.log(req.body);
    console.log("delete");
    var status = 1;
    association.find({ name:req.body.name }).remove(function(err){
    	if(err){
    		console.log(err);
    		return;
    	}
    	console.log("success delete");
    });
    res.json({
    	status: status
	});
});

function createAssociation(obj) {
	obj.maxStudentCap = parseInt(obj.maxStudentCap);
	obj.id = "" + associationList.length + 1;
	obj.available = true;
	var newAssociation = new association(obj);
	
	return newAssociation;
}

module.exports = router;
