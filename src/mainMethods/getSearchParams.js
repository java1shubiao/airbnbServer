const compileInput = require('../api/compileInput');
module.exports = (url)=>{
    const params =new RegExp(compileInput(url));
    return params;
}