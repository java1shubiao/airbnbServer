const connects = require('./connect');
const async=require('async');
const mongodb = require('mongodb').MongoClient;

module.exports = async (dbname,collectionname,query,i,j,callback)=>{
    var url = "mongodb://localhost:27017/runoob";
    var client = new mongodb(url);
    await client.connect();
    const db = client.db(dbname);
    let col = await db.collection(collectionname);
    col.find({name:{$regex:query}}).skip(i).limit(j).toArray((error,results)=>{
        callback(error,results);
    });
}