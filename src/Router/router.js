const express = require('../../node_modules/express');
const home = require('./routerMethods/home')
const analysefromdb = require('../mainMethods/analysedbdata')
const router = express.Router();

router.get('/home/:page',analysefromdb);

module.exports=router;