const express = require('../node_modules/express')
const url = require('../node_modules/url')
var svgCaptcha = require('svg-captcha');
const server = express()
const https = require('https');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const connect = require('./DB/connect');
const search = require('./api/compileInput');
const mainMethod = require('./mainMethods/mainMethod')
const router = require('./Router/router')
const registerMethod = require('./mainMethods/register_Controller')
const loginEvent = require('./mainMethods/login_Controller')
const routerID = require('./Router/routerID')
const socket = require('socket.io')
const shoppingcarDetail_controller = require('./mainMethods/shoppingcarDetail_Controller')
const http = require('http').createServer(server);
const saveComment = require('./DB/saveComments')
const addshoppingcar_controller = require('./mainMethods/addshoppingcar_Controller')
const placeorder_controller = require('./mainMethods/placeorder_Controller')
var session = require('express-session')
const saveImage = require('./mainMethods/savePhotos_Controller')
const hotairbnbController = require('./analyzer/analyzeruserOrder')
const editDataController = require('./mainMethods/airbnbSystem/editData_Controller')
const loginContrller = require('./mainMethods/commonController/loggin_Controller')
const commentController = require('./mainMethods/commet_Cotroller')
const uploadfile =require('./mainMethods/uploadFile_Controller')
const pictrueController = require('./mainMethods/picture_Controller')
const airbnbManageController = require('./mainMethods/airbnbSystem/airbnbManage_Controller')
const orderDetailcontroll = require('./mainMethods/orderDatail_Controller')
server.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
http.listen(4001)
server.use('/index',router);
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
// var cpUpload = upload.fields([{ name: 'file', maxCount: 1 }])
server.post('/profile', upload.single('file'), function (req, res,) {
    console.log(req.file) 
})
server.post('/savePhotos',saveImage)
server.get('/initPage/hotairbnb/:city',hotairbnbController)
server.use('/register',registerMethod)
server.use('/picture/:pictrueName',pictrueController)
server.use('/logining',loginEvent)
server.use('/detailPage',routerID)
server.post('/saveComments/:id',saveComment)
server.post('/addshoppingcar',addshoppingcar_controller)
server.post('/placeOrder',placeorder_controller)
server.use('/getorderdetail',orderDetailcontroll)
server.use('/photos/upload',uploadfile)
server.post('/submitData/:id',commentController)
server.post('/airbnbmanage/editData',editDataController)
//airbnb后台登录api
server.get('/reviewee/login',loginContrller)
server.get('/getshoppingcar/:user_id',shoppingcarDetail_controller)
server.get('/getverifycode',(req,res)=>{
    //产生6位的验证码和8为的密码
    var randomvarify =''
    var randompassword = ''
    var English = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','s','y','z','0','1','2','3','4','5','6','7','8','9']
    for(var i=0;i<6;i++){
        randomvarify+= Math.floor((Math.random()*10))
    }
    //产生密码
    for(var i=0;i<8;i++){
        randompassword+=English[Math.floor((Math.random()*35))]
    }
    console.log('随机产生的密码:',randompassword)
    req.sessionStore['randomvarify']= randomvarify
    req.sessionStore["randompassword"] = randompassword
    res.send({
        code:randomvarify
    })
})
server.post('/fygl/addairbnb',airbnbManageController)


//图形验证码
server.get('/get-img-verify', function (req, res) {
    console.log(req.query);
    var option = req.query;
    // 验证码，有两个属性，text是字符，data是svg代码
    var code = svgCaptcha.create(option);
    // 保存到session,忽略大小写
    req.sessionStore["randomcode"] = code.text.toLowerCase();
    console.log( req.sessionStore["randomcode"])
    // 返回数据直接放入页面元素展示即可
    res.send({
        img: code.data
    });
});

