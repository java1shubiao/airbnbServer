const fs = require('fs')
const formidable = require('formidable')
const path = require('path')
const multiparty = require('multiparty')
const mongodb = require('mongodb').MongoClient;
const apiurl = require("../api/apiurl")
const varies = require('../api/constVaries')
function uploadfile(req,res){
    console.log(req.body,"body")
    //生成multiparty对象，并配置上传目标路径
    let filedr = "../../../uploads";
    var form = new multiparty.Form({ uploadDir: path.join(__dirname + filedr) });
    var photos = []
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err)
        } else {
            //获取图片名
            files.file.forEach((data)=>{
                var patharr = data.path.split('.')
                var length = patharr.length
                console.log('patharr的长度',length)
                var type = patharr[length-1]
                console.log('图片名字的后缀',type)
                var time = new Date().getTime()
                var avatarName = '/'+time+'.'+type
                console.log('form.uploadDir',form.uploadDir)
                var newPath = form.uploadDir + avatarName;
                fs.renameSync(data.path,newPath)
                photos.push({
                    "large":`http://localhost:4001/picture/${time}.${type}`
                })
            })
            //yanz
            console.log('存放url的photos=',photos)
            //存储
            mongodb.connect(apiurl.mongodbURL,(err,db)=>{
                const dbo = db.db(varies.dbname1)
                const collection1  =dbo.collection(varies.collectionname1)
                //这里可能有错误.photos
                // console.log('照片上传的ID=',ID)
                // collection1.update({ID:ID},{$push:{
                //     'msxx_listing_details.photos':photos
                // }})
            })
            res.json({ imgSrc: files,photos:photos,code:200})
        }
    });
}
module.exports= uploadfile