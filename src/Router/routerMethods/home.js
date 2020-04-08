const splitPage = require('../../DB/splitPage')
const compileInput =require('../../api/compileInput')

module.exports = async (req,res)=>{
    var dbname = 'AirBnbInformation';
    const currentPage = parseInt(req.params.page);
    const skipnumber = (currentPage-1)*17;
    const limitnumber = 18;
    /**
     * 需要注意的：
     * 变量如果要作为正则表达式，需要先使用eval对变量进行格式转换
     * /"广州花都"/和/广州花都/,只有后者可以执行
     */
    const params= compileInput(req.url);
    const num = eval(params);
    var collectionname = num;
    const query = new RegExp(`${num}`);
    // console.log(currentPage)
    if(currentPage==1){
        /**
         * @descript 参数 dbname,collectionname,params,i,j,callback
         *
         *           返回值 分页的数据
         */
        const data = splitPage(dbname,collectionname,query,0,18,(error,data)=>{
            res.json(data);
            res.end()
        })
    }else if(currentPage>1){
        const number = (currentPage-1)*17;
        splitPage(dbname,collectionname,query,number,18,(error,data)=>{
            res.json(data);
            res.end()
        });
    }
}