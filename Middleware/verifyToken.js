const jwt = require('jsonwebtoken');

const verifyToken = ( req, res, next) => {
    const token = req.header('token');
    console.log(`Token from header : ${token}`);
    if(!token) return res.status(404).send('No Token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
        req.user = decoded ;
        next();
        
    } catch (error) {
        return res.status(403).send(error);   
    }
    
}

const adminsOnly = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id && req.user.isAdmin){
            next();
        } else{
            res.status(403).send('You are not allowed to proceed with this action, not an admin');
        }
    })
}

const staffsOrAdmins = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id && req.user.isStaff || req.user.isAdmin){
            next();
        } else{
            res.status(403).send('You are not allowed to proceed with this action, not a staff');
        }
    })
}

module.exports = {verifyToken,adminsOnly,staffsOrAdmins};