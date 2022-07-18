const router = require('express').Router();
const CryptoJS = require('crypto-js');
const {User} = require('../Models/user');

// CREATE AN ACCOUNT
router.post('/signup', async(req, res)=>{
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User with this account already exists');

    const newUser = new User({
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_PRIVATEKEY ).toString(),
        gender: req.body.gender,
        isAdmin: req.body.isAdmin,
        isStaff: req.body.isStaff
    })

    try {
        const savedUser = await newUser.save();
        let token = savedUser.generateAuthToken();
        console.log(token);
        res.header('token', token).send('Account Successfully Created');
        console.log(savedUser);
       
       } catch (error) {
        console.log(error)
        res.status(400).send(error);
       }

})

// LOG IN TO YOUR ACCOUNT
router.post('/signin', async(req,res)=>{
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(404).send('This user does not exist. Create an account');

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.JWT_PRIVATEKEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        console.log(originalPassword);
        console.log(req.body.password);
        if(originalPassword !== req.body.password ) return res.status(401).send('This Password is not registered');

        const token = user.generateAuthToken();
        console.log(user);
        console.log(token);
        res.header('token', token).send('Account Successfully Logged in');
            
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;
