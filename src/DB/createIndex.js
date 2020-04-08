module.exports = (err,db,dbname,collectionname)=>{
        const dbo = db.db(dbname);
        dbo.collection(collectionname).ensureIndex({"userInfor.username":1,"userInfor.password":1})
        console.log("将账号和密码设置为引索")
    }
