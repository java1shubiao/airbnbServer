const async = require('async');
const connect = require('./connect');

module.exports = async (dbname,collectionname,params) => {
    const data = [];
    const client = await connect();
    const db = client.db(dbname);
    db.collection(collectionname);
    db.find({'province':params}).toArray((err,result)=>{
        data = result;
    })
    return data;
}