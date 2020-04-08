const https = require('https');
const Method = require('./api/reptile')
const fs = require('fs')
const strs =require('../data/areaLink/area')
const async = require('async')
var Bottleneck = require("bottleneck/es5")
const mongodb = require('mongodb').MongoClient;
const dataForeach = require('./api/dataForeach');
const requestByhttps = require('./api/requestByhttps');
//民宿信息存储对象
var arr = ['广州花都','广州荔湾','广州越秀','广州海珠','广州天河','广州白云','广州黄埔','广州番禺','广州南沙','广州从化','广州增城'];
var collectionname = ['广州花都','广州荔湾','广州越秀','广州海珠','广州天河','广州白云','广州黄埔','广州番禺','广州南沙','广州从化','广州增城'];

/* arr.reduce((pre,data,index)=>{
    return pre.then(()=>{
        return new Promise(async (resolve)=>{ */
          dataForeach(strs,arr[12],requestByhttps,arr[12]);
             /* resolve()
       })
    })
},Promise.resolve()) */