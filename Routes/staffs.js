const router = require('express').Router();
const {Staff} = require('../Models/staff');
const {User} = require('../Models/user');
const {verifyToken, staffsOrAdmins, adminsOnly} = require('../Middleware/verifyToken');

// ADD STAFF TO DATABASE
router.post('/add', [adminsOnly], async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user || !user.isStaff) return res.status(400).send('You must be a registered staff in this college');

    try {
        const staff = new Staff(req.body);
        const newStaff = await staff.save();
        console.log(newStaff);
        res.status(200).send('New Staff Saved');
        
    } catch (error) {
        res.status(400).send(error);
    }
    
})


router.put('/update/:id',[adminsOnly], async(req,res)=>{

    try {
        const staff = await Staff.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true});
        if(!staff) res.status(404).send('No such staff exists');
        console.log(staff);
        res.status(200).send(staff);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:id',[adminsOnly], async(req, res)=>{
    try {
        const staff = await Staff.findByIdAndDelete(req.params.id);
        if(!staff) res.status(400).send('No such staff exists');
        console.log(staff);
        res.status(200).send('staff successfully removed from database');
            
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id',[staffsOrAdmins], async(req,res)=>{
    try {
        const staff = await Staff.findById(req.params.id);
        if(!staff) res.status(404).send('staff you are searching for does not exists');
        console.log(staff);
        res.status(200).send(staff);
        
    } catch (error) {
        res.status(400).send(error);
    }  
})

// GET all staffs, all staffs in a particular level/major/eligibility status 
router.get('/', [staffsOrAdmins], async(req,res)=>{
    try {
        if(req.query){
            let staff = await Staff.find(req.query);
            if(staff == ''){
                res.status(404).send('No results found')
            }else{
                res.status(200).send(staff);
            }
        }else{
            const staffs = await Staff.find();
            if(!staffs) res.status(404).send('No staffs in database');
            console.log(staffs);
            res.status(200).send(staffs);
        }
        
    } catch (error) {
        res.status(400).send(error);  
    }  
})
module.exports = router;
