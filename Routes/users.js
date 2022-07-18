const router = require('express').Router();
const {User} = require('../Models/user');

// ADD user TO DATABASE
router.post('/add', async(req,res)=>{
    try {
        const user = new User(req.body);
        const newUser = await user.save();
        console.log(newUser);
        res.status(200).send('New user Saved');
        
    } catch (error) {
        res.status(400).send(error);
    }
    
});

router.put('/update/:id', async(req,res)=>{

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true});
        if(!user) res.status(404).send('No such user exists');
        console.log(user);
        res.status(200).send(user);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete('/delete/:id', async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) res.status(400).send('No such user exists');
        console.log(user);
        res.status(200).send('user successfully removed from database');
            
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/:id', async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) res.status(404).send('user you are searching for does not exists');
        console.log(user);
        res.status(200).send(user);
        
    } catch (error) {
        res.status(400).send(error);
    }  
})

// GET all users, all users in a particular level/major/eligibility status 
router.get('/', async(req,res)=>{
    try {
        if(req.query){
            let user = await User.find(req.query);
            if(user == ''){
                res.status(404).send('No results found')
            }else{
                res.status(200).send(user);
            }
        }else{
            const users = await User.find();
            if(!users) res.status(404).send('No users in database');
            console.log(users);
            res.status(200).send(users);
        }
        
    } catch (error) {
        res.status(400).send(error);  
    }  
})
module.exports = router;
