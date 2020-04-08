const async = require('async')
const insertOne = require('./insertOne')
const ForeachCF = async(strs,collectionname,callback,idata)=>{
    var i = 0;
    return new Promise(async (resolve)=>{
        // while(i<strs[idata].length){
        //     (async ()=>{
        //         const result = await callback(strs[idata][i],collectionname,i);
        //     })()
        // }
        strs[idata].reduce((pre,data)=>{
            return pre.then(async (i)=>{
                return new Promise(async (resolve)=>{
                    const result = await callback(strs[idata][i],collectionname,i)
                    resolve(i+1)
                })
            })
        },Promise.resolve(0))
            
    })
}
module.exports = ForeachCF;