const parseUrlParams = require('../api/parseUrlParams')
const mongodb = require('mongodb').MongoClient;
const createIndex = require('../DB/createIndex')

function loginEvent(req,res){
    const params= parseUrlParams(req.url);
    const {username,password} = params
    console.log("前端传过来的参数params=>",params)
    // const {username,password} = params
    const dbname = 'admin'
    const collectionname = 'personalInformation'
    const url ="mongodb://localhost:27017/runoob";
    var user_id;

    var imageCode= req.query.imageCode.toLowerCase();
    if(imageCode===req.session['imageCode']){
        if(username!=undefined&&password!=undefined){
            if(req.session.login){
                console.log('req.session.login=>',req.session.login)
                console.log("expires=>",new Date(Date.now() + hour))
                res.send({ok:true,message:'登录成功'})
                res.end()
            }else{
                var hour = 3600
               
                console.log("expires=>",new Date(Date.now() + hour))
                mongodb.connect(url,{ useNewUrlParser: true },(err,db)=>{
        
                    createIndex(err,db,dbname,collectionname)
            
                   
                    const dbo = db.db(dbname)
            
                    dbo.collection(collectionname).find({'userInfor.username':username,'userInfor.password':password}).toArray((err,data)=>{
                        if(data.length!=0){
                            req.session.login = true
                            req.session.cookie.expires = new Date(Date.now() + hour)
                            user_id = data[0]._id
                            const success = {ok:true,message:'登录成功',user_id:user_id}
                            console.log("user_id=>",data[0]._id)
                            res.send(success)
                        }else{
                            const fail = {ok:false,message:'账号或者密码错误，请重新输入'}
                            res.send(fail)
                        }
                    })
                })
        
            }
        }else{
            if(req.session.login){
                const success = {ok:true,message:'登录成功',user_id:user_id}
                res.send(success)
            }
        }
       
    }else{
        //4：代表验证码错误的code
        res.send({message:'验证码错误',code:4})
    }  
}
module.exports=loginEvent