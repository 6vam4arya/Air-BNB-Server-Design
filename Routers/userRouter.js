const express = require('express');

const path = require('path');

const root = path.dirname(require.main.filename);

const userRouter = express.Router();

const Home = require('../models/AddedHomes');

// getting userController
const userController = require('../controllers/userController');

// make public folder static
userRouter.use(express.static(path.join(root,'public')));

// book-home route
userRouter.get('/book-home',userController.bookHome);

// getting home details route
userRouter.get('/:homeID',(req,res,next)=>{
    console.log(`Requested home details are of : ${req.params.homeID}`);
    // response = object of registeredhome having passed homeID
    Home.fetchAll((fileContents)=>{
        const reqHome = fileContents.find((element)=>{
            return element.id==req.params.homeID;
        }) 
        console.log(reqHome);
        // render a page with home details
        res.render('home-details/home1',{homeID : req.params.homeID,homeObj : reqHome });
    })
})

module.exports.userRouter = userRouter;