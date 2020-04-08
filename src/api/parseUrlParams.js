const url = require('url');

module.exports = parseurl;
function parseurl(urls){
    var constructor = url.parse(urls,true);
    var params = constructor.query;
    console.log(params)
    return params
}