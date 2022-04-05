var express = require('express')
var mysql = require('mysql')
var dbconfig = require('../db/dbconfig')
var cafe24 = require('../db/cafe24')
var mybatisMapper = require('mybatis-mapper')


var router = express.Router();
var pool = mysql.createPool(dbconfig); 
//mybatisMapper 모듈 가져와서 mapper 정보 받아서 query 쿼리문 전달



router.use(express.json())
//req.body를 json으로 받으려고 작성하는 식

mybatisMapper.createMapper(['./mapper/introduceSql.xml'])
//xml 가져올 준비
// npde의 main을 기준으로 경로 계산해야 함

var format = { language : 'sql', indent: '   '} 

router.post('/', (req, res, next) => {
    var params = req.body; //json
    var query = mybatisMapper.getStatement(
        params.mapper, params.mapper_id, params, format);
        //sql문 추출해서 query에 담기

    pool.getConnection(function(err, connection){
        connection.query(query, //여기는 반드시 sql문이 들어와야 에러가 안남
            (error, result) =>{
                if(error) throw error;      // result를 받지 못하는 상황
                if(req.body.crud == 'select'){
                    res.send(result);   // react한테 res.data를 줘
                }else{
                res.send("succ")    //react한테 succ라는 문자를 줘
                }
            })
        connection.release(); //연결한 것을 이제 풀어라! 다른 준비한게 있다면 그것도 실행될 수 있게 플러그를 뽑아라.
    })
})

module.exports = router;