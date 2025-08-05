const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    // Inside the function, it extracts the email of the authenticated user from the decoded token 
    const query ={email: email};

    const user = await User.findOne(query);
    const isAdmin = user?.role == 'admin';

    if(!isAdmin){
        return res.status(403).send({message: "forbidden access!"})
    }

    next();
};

module.exports = verifyAdmin;

/*
The purpose of this middleware is to restrict access to certain routes or endpoints to users with the 'admin'
role. It ensures that only administrators can access protected resources, adding an extra layer of security to the
application.
*/