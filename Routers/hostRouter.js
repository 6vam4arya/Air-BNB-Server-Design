const express = require('express');

const path = require('path');

const root_dir = path.dirname(require.main.filename);

const hostRouter = express.Router();

// getting controller for host routers
const hostController = require('../controllers/hostController');

// make public folder static
hostRouter.use(express.static(path.join(root_dir,'public')));

// getting home page for host
hostRouter.get('/home',hostController.getHomeForHost);

// getting form to add home for host
hostRouter.get('/host-home',hostController.getAddHome);

// parsing 
hostRouter.use(express.urlencoded());

hostRouter.post('/submit-form',hostController.handledetails);

// editing
hostRouter.use('edit/:homeID',hostController.editHome);

// saving edited home
hostRouter.use('/save-edited-home/:homeID',hostController.saveEditedHome);

// deleting 
hostRouter.use('delete/:homeID',hostController.deleteHome);

// export details to be shown on home page
module.exports.hostRouter = hostRouter;