const mongoose = require('mongoose');
const {userSchema} = require('./user');

const staffSchema = new mongoose.Schema({
    user: {type:userSchema, required: true},
    department: {type:String, required: true},
    courseTeaching:{type: Array, required: true}
    
}, {timestamps: true});

const Staff = mongoose.model('Staff', staffSchema);
module.exports.Staff = Staff;