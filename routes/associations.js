var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var association = mongoose.model('Association');

var associationList = [];

router.get('/getAllAssociation', function(req, res, next) {
    association.find({available: true}, function(err, association){
    	associationList = association;
    	res.json(association);
    });
});

router.put('/addAssociation', function(req, res, next) {
    
    var status = 1;
    association.update(
        {name: req.body.name},
        { $set:req.body},
        function(err, result){
            if(err){
                status = 0;
                console.log(err);
            }else if(result.nModified == 0){
                var newAssociation = createAssociation(req.body);
                newAssociation.save(function(err, association){
                    if(err){
                        console.log(err);
                        stauts = 0;
                    }
                    res.send("OK");
                });
            }else{
                res.send("OK");
            }
        }
    );
});

router.delete('/delAssociation', function(req, res, next) {
    var status = 1;
    association.find({ name:req.body.name }).remove(function(err){
    	if(err){
    		return;
    	}
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
