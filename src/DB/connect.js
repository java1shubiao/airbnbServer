const mongodb = require('mongodb').MongoClient;
const async =require('async');

module.exports = async ()=>{
    var url = "mongodb://localhost:27017/runoob";
    var client = new mongodb(url);
    return client;
};