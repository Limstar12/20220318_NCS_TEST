var express = require('express')
var routes = express.Router();

routes.get('/', (req,res,next) => {
    res.send('빠라빠빠')
})

module.exports=routes;