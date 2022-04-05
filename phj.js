var express = require('express')
var app = express();
// var app = require('express')(); 와 같다


var preinterview = require('./routes/preinterview')

app.post('/', (req,res,next) => {
    res.send('첫페이지 출력된다')
})



app.use('/preinterview', preinterview)


app.listen(8080, () => {
    console.log('콘솔창을 확인해봐 서버구동완료')
})
