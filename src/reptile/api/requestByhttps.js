const async = require('async');
const https = require('https');

const Method = require('./reptile');
const requestByHttps = async (url)=>{
    return new Promise(async (resolve)=>{
         https.get(url,(res)=>{
                var html = "";
                if(res.statusCode===200){
                    res.on("data",(data)=>{
                        html+=data;
                    })
                    res.on('end',()=>{
                        resolve(html);
                    })
                }
         })
    }) 
 }
const getData=async (url,collectionname,i)=>{
    console.log(i)
    const html = await requestByHttps(url);
    var obj = JSON.parse(html);
    const result = Method.getJsonData(obj,collectionname,i*18);
}

module.exports = getData;