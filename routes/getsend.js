var express = require('express')
var mysql = require('mysql')
var dbconfig = require('../db/dbconfig')
var routes = express.Router();


// var connection = mysql.createConnection(dbconfig)
var pool = mysql.createPool(dbconfig); // 8번을 9번으로 수정



routes.use(express.urlencoded({dxtended : true}))

// routes.get('/', (req,res,next) => {
//     res.send('눈누난나')
// })


routes.get('/getjson', (req,res,next) => {
    res.send({'url':'ddddddddddd',
              '바보냐' : '멍청이냐'  })
})

routes.get('/getno', (req,res,next) => {
    res.send('너는 json이 아냐')
})

// routes.get('/awssql', (req, res, next) => {

// routes.use(express.urlencoded({dxtended : true}))
//     .get('/dddd', (req,res,next) => {
//     pool.getConnection(function(err, connection){
//     var botable = req.query.botable;
    // ~~~~~?botable=interview
//     if(botable == 'interview'){
//     connection.query('SELECT * FROM reactinterview.'+botable,
//     (error, result) =>{
//         if(error) throw error;
//         console.log('해당스키마안의 테이블내용:', result)
//         res.send(result)
//             })
//         }
//         connection.release();
//     }) 
// })

// routes.get('/', (req, res, next) => {
//     var botable = req.query.botable;
    // ~~~~~?botable=interview
//     if(botable == 'interview'){
//         pool.getConnection(function(err, connection){
//             connection.query('SELECT * FROM reactinterview.'+botable,
//                 (error, result) =>{
//                     if(error) throw error;
//                     res.send(result)
//                 })
//             connection.release();            
//         })
//     }else{
//         var accident = require("../rout/normal")
//         routes.use('/dddd', accident)
//         next('route')
//     }
// })

routes.get('/', (req, res, next) => {
    var botable = req.query.botable;
    var crud = 'select'
    var query = 'select * FROM reactinterview.interview'+botable // xml 파일로 분리

    switch(botable){ //워크벤치의 스키마.테이블
        case "reactinterview.interview" :
        crud = 'select';
        break;
        // case "reactinterview.interview1" :
        // crud = 'insert into';
        // break;
        // case "reactinterview.interview2" :
        // crud = 'select';
        // break;
        default:
            botable = 'none';
            crud = '';
        break;
        }
        if(botable !== 'none'){ //botable이 none이 아니라면
            pool.getConnection(function(err, connection){
                connection.query(query,
                    (error, result) =>{
                        if(error) throw error;
                        res.send(result)
                    })
                connection.release();            
            })

    }
})

module.exports=routes;