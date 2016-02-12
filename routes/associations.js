var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var association = mongoose.model('Association');

router.get('/getAllAssociation', function(req, res, next) {
    association.find({available: true}, function(err, association){
    	res.json(association);
    });
});

module.exports = router;
