exports.bookHome = (req,res,next)=>{
    res.render('book-home');
};


const Home = require('../models/AddedHomes');

exports.getHomeDetails = (req,res,next)=>{
    console.log(`Requested home details are of : ${req.params.homeID}`);
    // response = object of registeredhome having passed homeID
    Home.fetchAll((fileContents)=>{
        const reqHome = fileContents.find((element)=>{
            return element.id==req.params.homeID;
        }) 
        // if reqHome is undefined
        if(reqHome==undefined){
            res.status(404).render('home-details/homeNotFound',{ID : req.params.homeID});
        }
        else{
            console.log(reqHome);
            // render a page with home details
            res.render('home-details/home1',{homeID : req.params.homeID,homeObj : reqHome });
        }
    })
};