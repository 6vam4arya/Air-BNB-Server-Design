// host-home
exports.getAddHome = (req,res,next)=>{
    res.render('host-home');
}


// handle submission 
let details = [];

// handle home details
exports.handledetails = (req,res,next)=>{
    details.push(req.body);
    console.log(details);    
    res.render('submit-form');
    exports.registeredhomes = details;
}
