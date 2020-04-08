const mongodb = require('mongodb').MongoClient;
const varies = require('../api/apiurl')
const {dbname1,collectionname1}=require('../api/constVaries')
const ObjectId = require('mongodb').ObjectId
function savephotos(req,res){
    var dt=''
    req.on('data',(data)=>{
        dt+=data
    })
    req.on('end',()=>{
        var obj = eval("(" + dt + ")")
        console.log('看看dt是什么:',obj)
        console.log(Object.prototype.toString.call(obj))
        mongodb.connect(varies.mongodbURL,(err,db)=>{
            const dbo = db.db(dbname1)
            const collection1 = dbo.collection(collectionname1)
            collection1.update({_id:ObjectId(obj.ID)},{$push:{
                'msxx_listing_details.photos':obj.phtos,
                "homestayDetail.picture_url":obj.phtos[0]
            }},(err,result)=>{
                console.log('更新成功')
                if(err) throw err
                res.send({code:200})
            })
        })
    })
}
module.exports = savephotos