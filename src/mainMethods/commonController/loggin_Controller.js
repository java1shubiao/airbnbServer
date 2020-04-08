const mongodb = require('mongodb').MongoClient;
const parseUrl = require('../../api/parseUrlParams')
function loginEvenet(req,res){
    var params = parseUrl(req.url)
    console.log('url的参数params',params)
    var {telphoneNumber,password,verifycode,dbname,collectionname} = params
    if(verifycode==req.sessionStore.randomcode){
        if(req.session.login){
            res.send({
                message:'恭喜登陆成功',
                code:200,
                login:true
            })
        }else{
            var url ="mongodb://localhost:27017/runoob";
            mongodb.connect(url,{ useUnifiedTopology: true },(err,db)=>{
                const dbo = db.db(dbname)
                const collection1 = dbo.collection(collectionname)
                collection1.find({"userinfor.telphoneNumber":telphoneNumber}).project({"userinfor.telphoneNumber":1,"userinfor.password":1,'_id':1}).toArray((err,data)=>{
                   if(data.length!=0){
                        if(data[0].userinfor.password==password){
                            req.session.login = true
                            console.log("查看用户的_id",data[0]._id)
                            res.send({
                                message:'恭喜登陆成功',
                                code:200,
                                login:true,
                                user_id:data[0]._id
                            })
                        }else{
                            res.send({
                                message:'密码错误',
                                code:404,
                                login:false
                            })
                        }
                   }else{
                    res.send({
                        message:'账号输入错误，无法匹配此账号',
                        code:404,
                        login:false
                    })
                   }
                   
                })
            })
        }
    }else{
        res.send({
            message:'验证码错误',
            code:404,
            login:false
        })
    }

}
module.exports = loginEvenet