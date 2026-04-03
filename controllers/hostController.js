// host-home
exports.getAddHome = (req,res,next)=>{
    res.render('host-home');
}


// handle submission 
// let details = [];
let {Home} = require('../models/schemas');
const mongoose = require('mongoose');

// handle home details
exports.handledetails = (req,res,next)=>{
    // create an object for incoming details     
    const {housename,cost,location,rating,description} = req.body;
    const newHome = new Home({housename,cost,location,rating,description});
    const promise = newHome.save();
    promise.then(res=>{
        console.log("Data Successfully Written!!!!");
        console.log(res);
    })
    console.log(req.body);
    res.render('submit-form');
}

// getting host home page
exports.getHomeForHost = (req,res,next)=>{
    let promise = Home.find();
    promise.then((all_homes)=>{
        res.render('home_for_host',{registeredhomes : all_homes});
    })
}

// editing home
exports.editHome = (req,res,next)=>{
    const ID = req.params.homeID;
    // find this home
    const promise = Home.findById(new mongoose.Types.ObjectId(ID)); /*⭐*/
    // returns a promise

    promise.then((req_home)=>{
        res.render('edit-home',{home:req_home});
    })    
}

// saving home
exports.saveEditedHome = (req,res,next)=>{
    let ID = req.params.homeID;
    ID = new mongoose.Types.ObjectId(ID);
    // find and update that home with all user edited details
    const {housename,cost,location,rating,description} = req.body;
    Home.findOneAndUpdate({_id:ID},{housename:housename,cost:cost,location:location,rating:rating,description:description}); /*🌸*/

    res.redirect('/home');
}

// deleting home
exports.deleteHome = (req,res,next)=>{
    
}

/*⭐ while taking this ID in dynamic URL, it was converted from Object ID to JS string, but now when searching in MongoDB collection using this, it exists there as Object ID type, hence it must be reconverted. */

/*🌸 when name of key and value are same in an object, key:value can be replaced by a shorthand having only value. Hence, {housename:housename,cost:cost,location:location,rating:rating,description:description} can also be written as {housename,cost,location,rating,description}*/

















































/*Without Mongoose and MongoDB*/

// // host-home
// exports.getAddHome = (req,res,next)=>{
//     res.render('host-home');
// }


// // handle submission 
// // let details = [];
// let {Home} = require('../models/schemas');

// // handle home details
// exports.handledetails = (req,res,next)=>{
//     // create an object for incoming details     
//     const promise = Home.save(req.body);
//     promise.then(res=>{
//         console.log("Data Successfully Written!!!!");
//         console.log(res);
//     })
//     console.log(req.body);
//     res.render('submit-form');
// }

// // getting host home page
// exports.getHomeForHost = (req,res,next)=>{
//     let promise = Home.find();
//     promise.then((all_homes)=>{
//         res.render('home_for_host',{registeredhomes : all_homes});
//     })
// }

// // editing home
// exports.editHome = (req,res,next)=>{
//     const ID = req.params.homeID;
//     // find this home
//     const promise = Home.findByID(ID);
//     // returns a promise

//     promise.then((req_home)=>{
//         res.render('edit-home',{home:req_home});
//     })    
// }

// // saving home
// exports.saveEditedHome = (req,res,next)=>{
//     const ID = req.params.homeID;
//     Home.save(ID);
//     res.redirect('/home');
// }

// // deleting home
// exports.deleteHome = (req,res,next)=>{
    
// }




















// // handle home details
// exports.handledetails = (req,res,next)=>{
//     // create an object for incoming details     
//     let newHome = new Home(req.body.housename, req.body.cost, req.body.rating, req.body.location, req.body.description);
//     // details.push(newHome);
//     newHome.save();
//     console.log(newHome);
//     res.render('submit-form');
// }

// exports.registeredHomes = details;
