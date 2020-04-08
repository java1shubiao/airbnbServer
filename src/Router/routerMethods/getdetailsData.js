module.exports = (req,res)=>{
    const ID = req.params.ID
    console.log(ID)
    const mongodb = require('mongodb').MongoClient;
   
    const url ="mongodb://localhost:27017/runoob";
    const dbname = 'AirBnbInformation'
    const collectionname = '广州天河'
    mongodb.connect(url,{ useNewUrlParser: true },(err,db)=>{
        const dbo =db.db(dbname);
            dbo.collection(collectionname).find({ID:ID}).toArray((err,results)=>{
                console.log(results)
                res.send(results)
                res.end()
            })
     
    })

}