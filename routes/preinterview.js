var express = require('express')
var router = express.Router();

var nomalpage = require('../rout/normal');
var awssql = require('./awssql')

router.use(express.urlencoded({ extended : true }))

router.post('/', (req, res, next) =>{   
   var type = req.query.type;
   req.body.mapper = "introduceSql";     
  
   if( type ){  
      switch(type){
         //사전인터뷰 글보기, 글쓰기, 글수정
         case 'interviewlist' : req.body.crud = "select"; 
                       req.body.mapper_id = "interview";
                       break;
         case 'interviewwrite': req.body.crud = "insert"; 
                       req.body.mapper_id = "interviewInsert";
                       break;
         case 'interviewmodify': req.body.crud = "update"; 
                       req.body.mapper_id = "interviewModify";
                       break; 
         default      : req.body.crud = "delete"; 
                        req.body.mapper_id = "interviewDrop";
                        break; 
      }      

          router.use('/', awssql )
          next('route')
   }
   else{           
        router.use('/', nomalpage )
        next('route')
   }   
})

module.exports = router;