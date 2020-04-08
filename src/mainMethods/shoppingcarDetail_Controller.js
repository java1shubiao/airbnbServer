const mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
function shoppingcarDetail_Controller(req,res){
    var user_id = req.params.user_id
    var dbname = 'admin'
    var collectionname = 'userShoppingCar'
    var url= "mongodb://localhost:27017/runoob"
    mongodb.connect(url,(err,db)=>{
        const dbo = db.db(dbname)
        dbo.collection(collectionname).find({"user_id":user_id}).toArray((err,data)=>{
            console.log('从数据库拿去的收藏夹的数据',data[0])
            res.send({message:data[0]})
            res.end()
        })
    })
}
module.exports = shoppingcarDetail_Controller