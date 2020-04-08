//余弦相似度算法
const Segment = require('node-segment').Segment
var segment = new Segment();
// 使用默认的识别模块及字典
segment.useDefault();
console.log("分词器segment开始")
var str1 = "广州市花都区天河区南沙上下九正佳广场北京路"
var str2 = '广州市南沙广场北京路'
// 开始分词
function analyseWord(str1,str2){
  var wordOne = segment.doSegment(str1, {
    simple: true,
    stripPunctuation: true
  });
  var wordTwo = segment.doSegment(str2, {
    simple: true,
    stripPunctuation: true
  })
  
  console.log("分词器分解词语'广州市花都区天河区南沙广州上下九正佳广场北京路',结果为=>",wordOne);
  console.log("分词器分解词语'广州天河正佳广场',结果为=>",wordTwo)
  
  var arrWordOne = [],arrWordTwo=[]
  for(var i=0;i<wordOne.length;i++){
    arrWordOne.push(wordOne[i].w)
  }
  console.log("arrWordOne=>",arrWordOne)
  for(var i=0;i<wordTwo.length;i++){
    arrWordTwo.push(wordTwo[i].w)
  }
  console.log("arrWordTwo=>",arrWordTwo)
  
  //将wordOne和wordTwo转为set
  
  var settype = new Set(arrWordOne.concat(arrWordTwo))
  console.log("将arrWordOne和arrWordTwo转为set=>",settype)
  
  var maptype = new Map()
  var j=0
  for(var value of settype){
    console.log("settype的value=>",value)
    maptype.set(value,j)
    j++
  }
  console.log("将settype转换为map类型=>",maptype)
  
  var arrOne = [],arrTwo = []
  arrWordOne.forEach((value)=>{
    console.log("arrWordOne的值=>",value) //,"arrWordOne的下标=>",idnex
    arrOne.push(maptype.get(value))
  })
  console.log("arrOne=>",arrOne)
  arrWordTwo.forEach((value)=>{
    console.log("arrWordTwo的值=>",value) //,"arrWordTwo的下标=>",idnex
    arrTwo.push(maptype.get(value))
  })
  console.log("arrTwo=>",arrTwo)
  //初始化
   var listAcodeOne = [],listAcodeTwo=[]
   for(var i =0;i<settype.size;i++){
     listAcodeOne[i]=0;
     listAcodeTwo[i]=0
   }
  
  console.log("初始化的listAcodeOne为=>",listAcodeOne,"初始化的listAcodeTwo为=>",listAcodeTwo)
  
  arrOne.forEach((value,index)=>{
    listAcodeOne[value]+=1
  })
  arrTwo.forEach((value,index)=>{
    listAcodeTwo[value]+=1
  })
  console.log("listAcodeOne=>",listAcodeOne)
  console.log("listAcodeTwo=>",listAcodeTwo)
  
  //余弦算法计算部分
  
  var fenzi=0,fenmu=0,sum1=0,sum2=0;
  for(var i=0;i<Math.max(listAcodeOne.length,listAcodeTwo.length);i++){
    fenzi+=listAcodeTwo[i]*listAcodeOne[i]
  }
  console.log("fenzi=>",fenzi)
  listAcodeOne.forEach((data)=>{
    sum1+=data*data
  })
  console.log('sum1=>',sum1)
  listAcodeTwo.forEach((data)=>{
    sum2+=data*data
  })
  console.log('sum2=>',sum2)
  fenmu = Math.sqrt(sum1)*Math.sqrt(sum2)
  console.log("fenmu=>",fenmu)
  const result = parseFloat(fenzi/fenmu).toFixed(2)
  console.log("余弦算法计算结果=>",result)
  return result
}
module.exports = analyseWord