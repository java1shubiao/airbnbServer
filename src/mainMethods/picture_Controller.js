const fs = require('fs')
const path = require('path')
function pictureController(req,res){
    // var pictrueName = req.params.pictrueName
    // var data = fs.readFileSync();

    var pictureName = req.params.pictrueName
    res.sendFile(path.join(__dirname,'../../uploads',pictureName))
    // console.log()
}
module.exports = pictureController