const mongodb = require('mongodb').MongoClient;
const dburl = require('../../api/apiurl')
const ObjectId = require('mongodb').ObjectId
const {dbname1,collectionname1} = require('../../api/constVaries')
function editData(req,res){
     var dt=''
     req.on('data',(data)=>{
         dt+=data
     })
     req.on('end',()=>{
        var editData = eval("("+dt+")")
        console.log('将接收到的数据转为对象完成,editData',editData)
        var homestayDetail={
            "name":editData.data.name,
            "pricing_quote":{
				"amount_formatted":editData.data.price
            },
            "kicker_content":{
				"message":[
					editData.data.checkList[0]
				]
			},
            "localized_city_name":editData.data.mscity
        } 
        mongodb.connect(dburl.mongodbURL,(err,db)=>{
            const dbo = db.db(dbname1)
            const collection1 = dbo.collection(collectionname1)
            collection1.update({_id:ObjectId(editData.ID)},{$set:{
                "msaddress":editData.data.msaddress,
                "reviewee_id":editData.data.reviewee_id,
                "ID":editData.data.airbnb_ID,
                "homestayDetail":homestayDetail,
                "msxx_listing_details.ms_enough":editData.data.enoughPeople
            }},(err,result)=>{
                if(result){
                    console.log('更新成功')
                }
            })
        })
         
     })
}
module.exports = editData