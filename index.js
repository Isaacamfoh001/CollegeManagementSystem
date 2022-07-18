const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const auth = require('./Routes/auth');
const staffs = require('./Routes/staffs');
const students = require('./Routes/students');
const courses = require('./Routes/courses');
const users = require('./Routes/users');

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/staffs', staffs);
app.use('/api/students', students);
app.use('/api/courses', courses);
app.use('/api/users', users);

mongoose.connect(process.env.MONGODB_URL)
        .then(()=> console.log('MongoDB Coonected Succesfully'))
        .catch((error)=>{console.log(error)});

const PORT = process.env.PORT || 3000;
app.listen( PORT , () =>{
    console.log(`Backend Server listening on port ${PORT}`);
})