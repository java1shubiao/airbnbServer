const mongodb = require('mongodb').MongoClient;
const parseUrl = require('../api/parseUrlParams')
const ObjectId = require('mongodb').ObjectId
function submitComment (req,res){
    var receivedata =''
    req.on('data',(data)=>{
        receivedata+=data
    })
    req.on('end',()=>{
        var airbnb_id = receivedata.airbnb_id
        console.log('民宿数据表的ID',airbnb_id)
        var user_id = req.params.id
        console.log('用户表的_id=>',user_id)
        var result = JSON.parse(receivedata)
        console.log('接受前端的数据receivedata:',receivedata)
        const url ="mongodb://localhost:27017/runoob"
        var dbname = 'AirBnbInformation'
        var dbname2 = 'admin'
        var dbname3 = 'admin'
        //暂时设置为广州天河
        var collectionname = '广州天河'
        var collectionname2 = 'reviewee'
        var collectionname3 = 'personalInformation'
        mongodb.connect(url,(err,db)=>{
            var dbo = db.db(dbname)
            var dbs = db.db(dbname2)
            var db3 = db.db(dbname3)
            var collection1 =  dbo.collection(collectionname)
            var collection2 =  dbs.collection(collectionname2)
            var collection3 = db3.collection(collectionname3)
            var obj = {}
            var userobj = {}
            //获取房东信息
            collection1.find({ID:airbnb_id}).toArray((err,data)=>{
                //在房东数据表中查找房东的信息
                collection2.find({_id:data.reviewee_id}).toArray((err,data)=>{
                    console.log('名为reviewee的collection的name=>',data.name)
                    console.log('名为reviewee的collection的headimg=>',data.headimg)
                    obj[host_name]=data.name
                    obj[picture_url]=data.headimg
                    console.log(1)
                }) 
                console.log("obj:",obj)
                
            })
            //获取客户的信息,在客户信息表中获取客户的信息
            collection3.find({_id:ObjectId(user_id)}).toArray((err,data)=>{
                console.log('名为personalInformation的collection的name=>',data.name)
                console.log('名为personalInformation的collection的headimg=>',data.headimg)
                userobj[host_name] = data.name
                userobj[picture_url] = data.headimg
            })
            console.log("userobj:",userobj)
            //插入信息到对应的民宿对象的review中
            collection1.updateMany({ID:ObjectId(airbnb_id)},{$push:{'reviews':{
                "comments":receivedata.appraise_content,
                "airbnb_accurate":receivedata.airbnb_accurate,
                "airbnb_serve":receivedata.airbnb_serve,
                "airbnb_comfortable":receivedata.airbnb_comfortable,
                "airbnb_appraise":receivedata.airbnb_appraise,
                "label_":receivedata.label_,
                "reviewee":obj,
                "reviewer":userobj
            }}})
        })

    })
}
module.exports = submitComment