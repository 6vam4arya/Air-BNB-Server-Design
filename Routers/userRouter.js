const express = require('express');

const path = require('path');

const root = path.dirname(require.main.filename);

const userRouter = express.Router();

// getting userController
const userController = require('../controllers/userController');

// make public folder static
userRouter.use(express.static(path.join(root,'public')));

// book-home route
userRouter.get('/book-home',userController.bookHome);

// getting home details route
userRouter.get('/:homeID',userController.getHomeDetails);



module.exports.userRouter = userRouter;