const express = require('express');

const path = require('path');

const root = path.dirname(require.main.filename);

const userRouter = express.Router();

// make public folder static
userRouter.use(express.static(path.join(root,'public')));

// book-home route
userRouter.get('/book-home',(req,res,next)=>{
    res.render('book-home');
})

module.exports.userRouter = userRouter;