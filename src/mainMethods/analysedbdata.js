const analyseWord = require('../analyzer/spliceWord')
const mongodb = require('mongodb').MongoClient
const parseurl = require('../api/parseUrlParams')
const kspx =require('../api/kspx')
const {dbname1,collectionname3} =require('../api/constVaries')
//获取数据库的msaddress数据
function analysedataFromdb(req,res){
    const url ="mongodb://localhost:27017/runoob";
    mongodb.connect(url,(err,db)=>{
        const dbo = db.db(dbname1)
        const str = parseurl(req.url)
        console.log("url的参数input=>",str)
        //'homestayDetail.kicker_content.message[0]':str.obj.airbnbtype,'homestayDetail.ms_enough':{$gte:str.obj.adult+str.obj.children},$and:[{'homestayDetail.pricing_quote.amount_formatted':{$gt:str.obj.minprice}},{'homestayDetail.pricing_quote.amount_formatted':{$lt:str.obj.maxprice}}]},{"msaddress":1}
        dbo.collection(collectionname3).find({"provinvce":"广州"}).toArray((err,result)=>{
            var arr=[]
            var array = []
            var iTocosValue = new Object()
            console.log("返回的数据类型：",Object.prototype.toString.call(result))
            for(var i=0;i<result.length;i++){
                console.log('i=>',i)
                console.log("msaddress=>",result[i].msaddress)
                const cosValue = analyseWord(str.input,result[i].msaddress) 
                if(cosValue>=0.3){
                    iTocosValue[i]=cosValue
                    array.push(cosValue)
                    // arr.push(result[i])
                }
            }
            console.log("object类型变量iTocosValue：key=>cosValue,value=>i",iTocosValue)
            //快速排序算法
            console.log("array的长度=>",array.length)
            kspx(0,array.length-1,array)
            var index = 0;
            array.forEach((data)=>{
                //对重复元素的操作，删除 
                for(var value in iTocosValue){
                    if(data == iTocosValue[value]){
                        index = value
                    }
                }
                delete iTocosValue[index]
                arr.unshift(result[index])
            })
            console.log("把分析后大于0.5的词放于数据arr中，arr=>",arr)
            const currentPage = parseInt(req.params.page);
            if(currentPage==1){
                // console.log("第一页显示数据arr的前18条数据：",arr.splice(0,18))
                if(arr.length<18){
                    console.log("当arr的数据长度小于18的时候，全部发送到前端。长度为：",arr.length)
                    res.send(arr)
                }else{
                    res.send(arr.splice(0,18))
                }
            }else if(currentPage>1){
                var num = (currentPage-1)*17
                console.log(`"第${currentPage}页显示数据arr的${num}-${num+18}数据："`,arr.splice(num,num+18))
                res.send(arr.splice(num,num+18))
                res.end() 
            }
        })
    })

}
module.exports= analysedataFromdb