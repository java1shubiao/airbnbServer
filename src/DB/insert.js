const connect = require('./connect');
const async=require('async');
const mongodb = require('mongodb').MongoClient;


/**
 *  @description 数据库插入数据
 * dbname：mongoDB的数据库名
 * collectionname：mongoDB的collection名
 * data:要插入的数据
 *  */
module.exports = async (dbname,collectionname,data)=>{
    const url ="mongodb://localhost:27017/runoob";

    mongodb.connect(url,{ useNewUrlParser: true },(err,db)=>{
        const dbo =db.db(dbname);
        if(data.length>1){
            dbo.collection(collectionname).insert(data)
        }else{
            dbo.collection(collectionname).insertOne(data)
        }
    })

}