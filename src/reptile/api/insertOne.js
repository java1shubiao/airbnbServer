const mongodbclient = require('mongodb').MongoClient;
const async = require('async');

module.exports = async (collectionname,data)=>{
    var url = "mongodb://localhost:27017/runoob";
    var dbname = 'airbnb';
    try{
        mongodbclient.connect(url,{ useNewUrlParser: true },(err,db)=>{
            const dbs =db.db(dbname);
            dbs.collection(collectionname).insert(data)
        })
    }catch(e){
        console.log(e.stack)
    }
}

