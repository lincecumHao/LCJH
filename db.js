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

var student = new Schema({
    "班級": String,
    "座號": String,
    "姓名": String,
    "第一志願": String,
    "第二志願": String,
    "第三志願": String,
    "第四志願": String,
    "第五志願": String
}, { collection: 'Student' });

mongoose.model( 'Association', association );
mongoose.model( 'Student', student );
mongoose.connect( 'mongodb://lcjh_admin:Q7PxDuK4gc4OZ0Z1gBlg@ds055485.mongolab.com:55485/lcjh', function(err) {
    if (err) throw err;
} );