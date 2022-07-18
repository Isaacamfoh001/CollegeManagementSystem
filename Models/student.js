const mongoose = require('mongoose');
const {userSchema} = require('./user');

const studentSchema = new mongoose.Schema({
    user: {type:userSchema, required: true},
    major: {type:String, required: true},
    level:{type:String, required: true},
    marksObtained: {type: Array},
    studentAttendance: { type: Array},
    inquiry: {type: String, required: false},
    isEligible: {type: Boolean, default: false}
    
}, {timestamps: true});

const Student = mongoose.model('Student', studentSchema);
module.exports.Student = Student;