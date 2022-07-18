const router = require('express').Router();
const {Student} = require('../Models/student');
const {User} = require('../Models/user');
const {verifyToken, adminsOnly,staffsOrAdmins} = require('../Middleware/verifyToken');

// ADD STUDENTS TO DATABASE
router.post('/add',[adminsOnly], async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user || user.isStaff) return res.status(400).send('You must be a registered student')
    
    try {
        const student = new Student(req.body);
        const newStudent = await student.save();
        console.log(newStudent);
        res.status(200).send(newStudent);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/update/:id',[adminsOnly], async(req,res)=>{

    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true});
        if(!student) res.status(404).send('No such student exists');
        console.log(student);
        res.status(200).send(student);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:id',[adminsOnly], async(req, res)=>{
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student) res.status(400).send('No such student exists');
        console.log(student);
        res.status(200).send('Student successfully removed from database');
            
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', [staffsOrAdmins], async(req,res)=>{
    try {
        const student = await Student.findById(req.params.id);
        if(!student) res.status(404).send('Student you are searching for does not exists');
        console.log(student);
        res.status(200).send(student);
        
    } catch (error) {
        res.status(400).send(error);
    }  
});

// GET all students, all students in a particular level/major/eligibility status 
router.get('/',[staffsOrAdmins], async(req,res)=>{
    try {
        if(req.query){
            let student = await Student.find(req.query);
            if(student == ''){
                res.status(404).send('No results found')
            }else{
                res.status(200).send(student);
            }
        }else{
            const students = await Student.find();
            if(!students) res.status(404).send('No students in database');
            console.log(students);
            res.status(200).send(students);
        }
        
    } catch (error) {
        res.status(400).send(error);  
    }  
});

module.exports = router;

