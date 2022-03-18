var express = require('express')
var routes = express.Router();

routes.get('/', (req,res,next) => {
    res.send('눈누난나')
})

module.exports=routes;