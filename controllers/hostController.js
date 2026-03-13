// host-home
exports.getAddHome = (req,res,next)=>{
    res.render('host-home');
}


// handle submission 
// let details = [];
let Home = require('../models/AddedHomes');

// handle home details
exports.handledetails = (req,res,next)=>{
    // create an object for incoming details     
    let newHome = new Home(req.body.housename, req.body.cost, req.body.rating, req.body.location, req.body.description);
    // details.push(newHome);
    newHome.save();
    console.log(newHome);
    res.render('submit-form');
}

// exports.registeredHomes = details;
