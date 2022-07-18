const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseTitle: {type:String, required:true },
    lecturer: {type: String, required:true},
    department: {type:String, required: true},
    lectureRoom: {type: String, required: true},
    timeTaken: {type: Array, required: true},
    yearTaken: {type:String, required: true},
    passmark: {type: Number, required: true},
    studentsTakingThisCourse:{type:Array, required: true},
    totalPassed: {type:Number},
    totalFailed: {type: Number},
    
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);
module.exports.Course = Course;