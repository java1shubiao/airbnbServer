const mongodb = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId()
const async = require('async')
const apiurl = require('../../api/apiurl')
const varies = require("../../api/constVaries")
function airbnbManageController(req,res){
    var airbnbInformation = ''
    req.on('data',(data)=>{
        airbnbInformation+=data
    })
    req.on('end',()=>{
        var airbnbInformationObj = JSON.parse(airbnbInformation)
        console.log("airbnbInformationObj=",airbnbInformationObj)
        var homestayDetail={
            "name":airbnbInformationObj.name,
            "pricing_quote":{
                "amount_formatted":parseFloat(airbnbInformationObj.price)
            },
            "kicker_content":{
				"message":[
					airbnbInformationObj.checkList[0]
				]
			},
            "localized_city_name":airbnbInformationObj.mscity,
            'ms_enough':airbnbInformationObj.enoughPeople
        } 
        mongodb.connect(apiurl.mongodbURL,(err,db)=>{
            const dbo = db.db(varies.dbname1)
            const collection = dbo.collection(varies.collectionname1)
            const timer = new Date().getTime()
            collection.insertOne({
                "msaddress":airbnbInformationObj.msaddress,
                "reviewee_id":airbnbInformationObj.reviewee_id,
                "ID":airbnbInformationObj.airbnb_ID,
                homestayDetail,
                "msxx_listing_details":{
                    'ms_enough':airbnbInformationObj.enoughPeople,
                    photos:[],
                    "reviews":[],
                    "listing_amenities":[]
                },
                'shoppingCarNumber':0,
                'orderNumber':0,
                'createTime':timer
            },{safe:true},(err,result)=>{
                var _id = result.ops[0]._id
                res.send({
                    _id:_id
                })
            })
        })

    })
}
module.exports = airbnbManageController