const mongodb = require('mongodb').MongoClient;
const dburl = require('../api/apiurl')
const async =require('async')
const {dbname1,collectionname1,collectionname2} = require('../api/constVaries')
const ObjectId =  require('mongodb').ObjectId
function analyzeruserOrder(req,res){
    mongodb.connect(dburl.mongodbURL,{ useUnifiedTopology: true },(err,db)=>{
        const dbo = db.db(dbname1)
        const collection1  =dbo.collection(collectionname1)
        const collection2 = dbo.collection(collectionname2)
        const city = req.params.city
        collection1.find({'provinvce':city}).toArray((err,data)=>{
                         var resultArr = data
                         console.log('放回的数据类型',Object.prototype.toString.call(data),Object.prototype.toString.call(data[0]))
                        // resolve(resultArr)
                        function getU(data){
                            var star = data[0].userstar
                            console.log("用户的等级值",star)
                            u = 1-1/(2*star-1)
                            return u.toFixed(4)
                            console.log('u:',u)
                        }
                        function computed(dt,u){
                            var score1,score2,D1,D2,u,D,Q;
                            score1 = parseInt(dt.orderNumber)*1.5
                            score2 = parseInt(dt.shoppingCarNumber)*1.2
                            console.log('score1:',score1,"score2:",score2)
                            D1 = score1*u
                            D2 = score2*u
                            D = D1+D2
                            console.log('D:',D)
                            var currentTime = new Date().getTime()
                            T = 1/(-dt.createTime+currentTime-1)
                            console.log('时间T:',T)
                            Q=D*T
                            console.log('Q',Q)
                            return Q
                        }
                        function save(Q,index,record){
                            record[index] = { score:Q,index:index}
                        }
                       function paixu(sortarr,record,resultArr){
                            console.log('记录Q和对应的数组下标index',record)
                            function compare(index){
                                return (a,b)=>{
                                    var value1 = a[index]
                                    var value2 = b[index]
                                    return value2-value1
                                }
                            }
                            record.sort(compare('score'))
                            console.log('排序后的record',record)
                            record.forEach((data)=>{
                                sortarr.push(resultArr[data['index']])
                            })
                            console.log("重新排序后的民宿",sortarr)
                        }
                        var record = []
                        var sortarr=[]
                        async  function promises(dt,index){
                            return new Promise(async(resolve,reject)=>{
                                collection2.find({_id:ObjectId(dt.reviewee_id)},{userstar:1}).toArray(async(err,data)=>{
                                    /* 
                                    用户的等级star
                                     */
                                    console.log(dt.reviewee_id)
                                    var u = getU(data)
                                    /* 
                                    计算
                                    */
                                   var  q = computed(dt,u)
                                   /* 
                                   保存
                                   */
                                  save(q,index,record)

                                    // res.send({message:sortarr})
                                  resolve()
                                })
                            })
                        }
                        
                        resultArr.forEach(async(dt,index)=>{
                            await promises(dt,index)
                        })
                        //如何让循环先执行再执行下面的
                        setTimeout(() => {
                            console.log('保存后的record',record)
                            paixu(sortarr,record,resultArr)
                            console.log(sortarr)
                            res.send({message:sortarr})
                            res.end()
                        }, 500);
                       
        })
    })
}
        

module.exports = analyzeruserOrder