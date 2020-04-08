const mongodb = require('mongodb').MongoClient;
// const parseUrlParams = require('../api/parseUrlParams')
module.exports = (req,res)=>{
    var comments  = '';
    req.on('data',(data)=>{
        comments = data
    })
    req.on('end',()=>{
        // var params = parseUrlParams(req.url)
        // console.log(params)
        const url ="mongodb://localhost:27017/runoob";
        console.log(comments.toString())
        const id = req.params.id
        mongodb.connect(url,(err,db)=>{
            const dbo = db.db('AirBnbInformation')
            dbo.collection('广州天河').update({ID:id},{$push:{ "msxx_listing_details.reviews":{
                "comments" :eval(comments),
                "id" :593406721, 
                "reviewee" : {
                    "deleted" : false, 
                    "first_name" : "沫希", 
                    "host_name" : "沫希", 
                    "id" : 123358682, 
                    "picture_url" : "https://z1.muscache.cn/im/pictures/user/56e99580-9af6-4ade-8a1c-8007ee696eb9.jpg?aki_policy=profile_x_medium", 
                    "profile_path" : "/users/show/123358682", 
                    "is_superhost" : false
                }, 
                "reviewer" : {
                    "deleted" : false, 
                    "first_name" : "平安喜乐", 
                    "host_name" : "平安喜乐", 
                    "id" : 296633739, 
                    "picture_url" : "https://z1.muscache.cn/im/pictures/user/2c1ad425-9599-4f3f-ac7a-ff2916ec6ee6.jpg?aki_policy=profile_x_medium", 
                    "profile_path" : "/users/show/296633739", 
                    "is_superhost" : false
                }, 
                "localized_date" : "2020年1月"
            }}})
        })
    })
       

    
   
}