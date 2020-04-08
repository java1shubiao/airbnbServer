const insert = require("../DB/insert")
const mongodb = require('mongodb').MongoClient;
const parseUrl = require('./../api/parseUrlParams')
function registerMethod(req,res){
    let receiptDt=''

    req.on('data',(data)=>{
        receiptDt+=data
    })

    req.on('end',()=>{
        const url ="mongodb://localhost:27017/runoob";
        console.log(Object.prototype.toString.call(receiptDt))
        const obj = JSON.parse(receiptDt)
  /*       const {registerSfz,registerTel,registerUsername,registerName,registerPassword}= obj
        const insertData = {}
        insertData.userInfor = {}
        insertData.userInfor.name = registerName
        insertData.userInfor.telphone = registerTel
        insertData.userInfor.sfz = registerSfz
        insertData.userInfor.username = registerUsername
        insertData.userInfor.password = registerPassword */
        const {telphoneNumber,city,name,imgverify} = obj
        const insertData = {}
        insertData.userinfor = {}
        insertData.userinfor.telphoneNumber = eval(telphoneNumber)
        console.log(telphoneNumber)
        insertData.userinfor.city =eval(city)
        insertData.userinfor.name = eval(name)
        insertData.userinfor.password = req.sessionStore.randompassword
        var params = parseUrl(req.url)
        const dbname = params.dbname
        const collectionname1 = params.collectionname
        const collectionname2 = 'userOrder'
        const collectionname3 = 'userShoppingCar'
        var user_id;
        // var imageCode= req.query.imageCode.toLowerCase();
        console.log('前端传过来的imageCode:',imgverify)
        console.log("session['imageCode']:",req.sessionStore['randomcode'])
       console.log(Object.prototype.toString.call(req.sessionStore['randomcode']))
        var randomcode = req.query.randomverify
        console.log('前端传过来的randomcode:',randomcode)
        console.log('sessionStore.randomvarify:',req.sessionStore.randomvarify)
        if(eval(imgverify)==req.sessionStore['randomcode']){
            if(randomcode==req.sessionStore.randomvarify){
                mongodb.connect(url,{ useNewUrlParser: true },async (err,db)=>{
                    const dbo =db.db(dbname);
                    const collection1 = dbo.collection(collectionname1)
                    const collection2 = dbo.collection(collectionname2)
                    const collection3 = dbo.collection(collectionname3)
                    console.log('collection1')
                    // if(insertData.length>1){
                        collection1.insert(insertData)
                        // collection1.insert({a:1})
                        if(params.collectionname=='personalInformation'){
                            collection1.find({'userinfor.telphoneNumber':eval(telphoneNumber)}).toArray((err,data)=>{
                                console.log(err)
                                console.log(`"telphoneNumber为${telphoneNumber}的_id:${data[0]}"`)
                                collection2.insert({
                                    "user_id":`${data[0]._id}`,
                                    "order_list":[]
                                }).then(()=>{
                                    console.log('集合collection2插入数据成功')
                                })
                                collection3.insert({
                                        "user_id":`${data[0]._id}`,
                                        "shoppingCar_list":[]
                                }).then(()=>{
                                    console.log('集合collection3插入数据成功')
                                })
                            })
                        }
                   /*  }else{
                        // await asyncTosync()
                        
                        collection1.insert(insertData)
                        collection1.insert({a:1})
                        // collection1.find({'userInfor.sfz':registerSfz}).toArray((err,data)=>{
                        //     var user_id=0;
                        //     console.log(data)
                        //     uer_id = data[0]._id
                        //     console.log(`"sfz为${registerSfz}的用户_id=>${user_id}"`)
                        // })
                        collection1.find({'userInfor.telphoneNumber':telphoneNumber}).toArray((err,data)=>{
                            user_id = data[0]._id
                            // console.log(`"sfz为${registerSfz}的_id:${data[0]._id}"`)
                            console.log(`"telphoneNumber为${telphoneNumber}的_id:${user_id}"`)
                            collection2.insert({
                                "user_id":`${user_id}`,
                                "order_list":[]
                            }).then(()=>{
                                console.log('集合collection2插入数据成功')
                            })
                            collection3.insert({
                                    "user_id":`${user_id}`,
                                    "shoppingCar_list":[]
                            }).then(()=>{
                                console.log('集合collection3插入数据成功')
                            })
                        })
                    } */
                    res.send({
                        message:'注册成功',
                        code:200,
                        password:req.sessionStore.randompassword
                    })
                })
            }else{
                res.send({
                    message:'短信验证码输入错误或者超时'
                })
            }
        }else{
            //4：代表验证码错误的code
            res.send({message:'验证码错误',code:4})
        }  
    })
  
}
module.exports=registerMethod;