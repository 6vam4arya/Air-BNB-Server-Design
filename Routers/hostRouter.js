const express = require('express');

const path = require('path');

const root_dir = path.dirname(require.main.filename);

const hostRouter = express.Router();

// make public folder static
hostRouter.use(express.static(path.join(root_dir,'public')));

hostRouter.get('/host-home',(req,res,next)=>{
    res.render('host-home');
})

// handle submission 
let details = [];

hostRouter.post('/submit-form',express.urlencoded());
// someone submits a form with some details, parse it and store in the "body" attribute of "request" object


hostRouter.post('/submit-form',(req,res,next)=>{
    details.push(req.body);
    console.log(details);    
    res.render('submit-form');
})

// export details to be shown on home page
module.exports.registeredHomes = details;
module.exports.hostRouter = hostRouter;