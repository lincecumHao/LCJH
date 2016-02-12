var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var association = new Schema({
    id: String,
    name: String,
    teacherName: String,
    classRoom: String,
    maxStudentCap: Number,
    classRoomWhenRain: String,
    common: String,
    available: Boolean
}, { collection: 'Associations' });

mongoose.model( 'Association', association );

mongoose.connect( 'mongodb://lcjh_admin:Q7PxDuK4gc4OZ0Z1gBlg@ds055485.mongolab.com:55485/lcjh', function(err) {
    if (err) throw err;
} );