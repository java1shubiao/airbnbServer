const search = require('../DB/search') 
const getSearchParams = require('./getSearchParams')

module.exports = (req,res)=>{
    /**
     * @description 参数 dbname,collectionname,params
     *              返回值
     */
    var dbname = 'AirBnbInformation';
    var collectionname = 'GZhd';
    var params = getSearchParams();
    var result = search(dbname,collectionname,params);
    res.send(result);
}