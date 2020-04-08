const mongodb = require('mongodb').MongoClient;
const {collectionname3} = require('../api/constVaries')
function addshoppingcar_Controller(req,res){
    const url ="mongodb://localhost:27017/runoob";
    const dbname = "admin"
    const collectionname = "userShoppingCar"
    var insert_Order_Data="";
    req.on('data',(data)=>{
        insert_Order_Data+=data
    })
    req.on('end',()=>{
        mongodb.connect(url,{ useUnifiedTopology: true } ,(err,db)=>{
            const dbo = db.db(dbname);
            var user_ids = JSON.parse(insert_Order_Data).user_id
            console.log("insert_Order_Data=>",insert_Order_Data,user_ids)
            /* 
            更新orderNumber的值
            */
           console.log('加入购物车后，更新民宿表的orderNumber')
            dbo.collection(collectionname3).find({ID:insert_Order_Data.id},{orderNumber:1}).toArray((err,data)=>{
                var resultDATA = data[0]
                dbo.collection(collectionname3).updateOne({ID:insert_Order_Data.id},{$push:{'orderNumber':resultDATA.orderNumber++}},()=>{
                    console.log('orderNumber已经更新完毕')
                })
            })
            /* 
            插入民宿数据
            */
            console.log('向订单表中插入的购物车信息')
            dbo.collection(collectionname).updateOne({user_id:user_ids},{$push:{"shoppingCar_list":JSON.parse(insert_Order_Data)}})
        })
    })
   
}
module.exports = addshoppingcar_Controller
