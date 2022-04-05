var express = require('express');
var nomalpage = require('../rout/normal');
var awssql = require('./awssql')
var routes = express.Router();

routes.use(express.urlencoded({extended : true}))
// 리액트에서 비동기로 요청 시 localhost:3000/react_router


routes.post('/', (req, res, next) => {
    var type = req.query.type; 
    
    // list, write, drop, modify -> switch or if elseif로 표현해도 됨
    if(type == 'list'){     // localhost:3000/react_router?type=list
        // localhost:3000/react_router?type=aws
        req.body.mapper = 'introduceSql'
        //req에 body가 있다면 res에는 data가 있다
        // introduceSql에서 매퍼 이름을 가져온다
        req.body.crud = 'select'
        // introduceSql에서 가져온다
        // select, insert, delete, update 중 하나만 가져올 수 있다
        req.body.mapper_id = 'interview'
        //sql문 정보를 담고있는 객체의 id
        routes.use('/', awssql)
        next('route')
    }else if(type == 'write'){      // localhost:3000/react_router?type=write
        req.body.mapper = 'introduceSql'
        req.body.crud = 'insert'
        req.body.mapper_id = 'interviewInsert'
        routes.use('/', awssql)
        next('route')
    }
    else{ //평범한 라우팅은 else에다가 작성!
        routes.use('/', nomalpage)
        next('route')
    // localhost:3000/react_router
    }
})

module.exports=routes;