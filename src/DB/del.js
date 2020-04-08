const mongodb = require('mongodb').MongoClient;

module.exports = (dbname,collectionname,data)=>{
    const url ="mongodb://localhost:27017/runoob";
    mongodb.connect(url,{ useNewUrlParser: true },(err,db)=>{
        const dbo = db.db(dbname)
        dbo.collection(collectionname).deleteOne(data,(err,obj)=>{
            if(err) throw err
            console.log('文档删除成功')
            db.close()
        })
    })
}