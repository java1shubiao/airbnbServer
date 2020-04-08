const mongodb = require('mongodb').MongoClient;
const {collectionname3} = require('../api/constVaries')
function placeorder_Controller(req,res){
    const url ="mongodb://localhost:27017/runoob";
    var id = req.params.id
    const dbname = "admin"
    const collectionname = "userOrder"
    var insert_Order_Data="";
    req.on('data',(data)=>{
        insert_Order_Data+=data
    })
    req.on('end',()=>{
        mongodb.connect(url,{ useUnifiedTopology: true } ,(err,db)=>{
            const dbo = db.db(dbname);
            var user_ids = JSON.parse(insert_Order_Data).user_id
            console.log("insert_Order_Data=>",insert_Order_Data,user_ids)
            console.log('下单后，更新民宿表的orderNumber')
            dbo.collection(collectionname3).find({ID:insert_Order_Data.id},{orderNumber:1}).toArray((err,data)=>{
                var resultDATA = data[0]
                dbo.collection(collectionname3).updateOne({ID:insert_Order_Data.id},{$push:{'orderNumber':resultDATA.orderNumber++}},()=>{
                    console.log('orderNumber已经更新完毕')
                })
            })
            console.log('向订单表中插入新加入的订单信息')
           dbo.collection(collectionname).updateOne({user_id:user_ids},{$push:{"order_list":JSON.parse(insert_Order_Data)}})
        })
    })
   
}
module.exports = placeorder_Controller