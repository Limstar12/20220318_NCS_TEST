var express = require('express')
var routes = express.Router();

routes.get('/', (req,res,next) => {
    res.send('/getsend의 요청에 응답할뿐')
})

module.exports=routes;