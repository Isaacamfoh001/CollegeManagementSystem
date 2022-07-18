const router = require('express').Router();
const {Course} = require('../Models/course');
const {User} = require('../Models/user');
const {verifyToken,staffsOrAdmins,adminsOnly} = require('../Middleware/verifyToken');

// ADD courses TO DATABASE
router.post('/add', [adminsOnly], async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('You are not authorized to proceed with this');
    
    try {
        const course = new Course(req.body);
        const newCourse = await course.save();
        console.log(newCourse);
        res.status(200).send(newCourse);
        
    } catch (error) {
        res.status(400).send(error);
    }
})

router.put('/update/:id',[staffsOrAdmins], async(req,res)=>{

    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true});
        if(!course) res.status(404).send('No such course exists');
        console.log(course);
        res.status(200).send(course);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:id', [adminsOnly],async(req, res)=>{
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if(!course) res.status(400).send('No such course exists');
        console.log(course);
        res.status(200).send('course successfully removed from database');
            
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id',[verifyToken], async(req,res)=>{
    try {
        const course = await Course.findById(req.params.id);
        if(!course) res.status(404).send('course you are searching for does not exists');
        console.log(course);
        res.status(200).send(course);
        
    } catch (error) {
        res.status(400).send(error);
    }  
})

// GET all courses, all courses in a particular level/major/eligibility status 
router.get('/',[verifyToken], async(req,res)=>{
    try {
        if(req.query){
            let course = await Course.find(req.query);
            if(course == ''){
                res.status(404).send('No results found')
            }else{
                res.status(200).send(course);
            }
        }else{
            const courses = await Course.find();
            if(!courses) res.status(404).send('No courses in database');
            console.log(courses);
            res.status(200).send(courses);
        }
        
    } catch (error) {
        res.status(400).send(error);  
    }  
})

module.exports = router;

