const express = require('express');

const path = require('path');

const root_dir = path.dirname(require.main.filename);

const hostRouter = express.Router();

// getting controller for host routers
const hostController = require('../controllers/hostController');

// make public folder static
hostRouter.use(express.static(path.join(root_dir,'public')));

hostRouter.get('/host-home',hostController.getAddHome);

hostRouter.post('/submit-form',express.urlencoded());
// someone submits a form with some details, parse it and store in the "body" attribute of "request" object

hostRouter.post('/submit-form',hostController.handledetails);

// export details to be shown on home page
module.exports.hostRouter = hostRouter;