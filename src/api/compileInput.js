const parseurl = require('./parseUrl');

module.exports = searchAI;

function searchAI(input){
    //先找市，再找区，在确定具体位置
    const res = parseurl(input);
    var result='';
    // console.log(res)
    // const res = "广州花都"
    var reg = /(.*)市(.*)区|(.*)区|(.*)市(.*)|(.*)/;//与或逻辑
    var returnresult = res.match(reg);
    if(returnresult[1]!=undefined){
        result= returnresult[1]+returnresult[2];
    }
    else if(returnresult[3]!=undefined){
        result = returnresult[3];
    }
    else if(returnresult[4]!=undefined){
        result = returnresult[4]+returnresult[5];
    }else if(returnresult[6]!=undefined){
        result = returnresult[6];
    }
    return result;
}
