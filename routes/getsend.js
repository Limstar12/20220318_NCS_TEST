const { Router } = require('express');
var express = require('express')
var mysql = require('mysql')
var dbconfig = require('../db/dbconfig')
var routes = express.Router();

routes.get('/', (req,res,next) => {
    res.send('눈누난나')
})

routes.get('/getjson', (req,res,next) => {
    res.send({'url':'ddddddddddd',
              '바보냐' : '멍청이냐'  })
})

routes.get('/awssql', (req, res, next) => {
    connection.query('SELECT * FROM reactinterview.interview', (error, result) =>{
        if(error) throw error;
        console.log('해당스키마안의 테이블내용:', result)
        res.send(result)
        })
})

module.exports=routes;