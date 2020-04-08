const express = require('../../node_modules/express');
const getdetailsData = require('./routerMethods/getdetailsData')
const router = express.Router();

router.get('/msxx_listing_details/:ID',getdetailsData)
module.exports =router