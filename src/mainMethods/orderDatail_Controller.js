const parseUrl = require('../api/parseUrlParams')
const mongodb = require('mongodb').MongoClient;
function orderDetailController(req,res){
    //解析url的params
    var params = parseUrl(req.url)
    var temporary = params._id

    const url ="mongodb://localhost:27017/runoob";
    var dbname = 'admin'
    var collectionname = 'userOrder'
    mongodb.connect(url,(err,db)=>{

        const dbo = db.db(dbname)
        
        dbo.collection(collectionname).find({'user_id':temporary}).toArray((err,data)=>{
            // console.log('查询_id为',temporary,'的结果为',data.order_list)
            console.log(data[0].order_list)
            res.send({message:data[0].order_list})
        })

    })
}
module.exports = orderDetailController