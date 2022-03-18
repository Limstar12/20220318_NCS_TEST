var express = require('express')
var app = express();

var postsend = require('./routes/postsend')
var getsend = require('./routes/getsend')
var sqlsend = require('./routes/sqlsend')

app.get('/', (req,res,next) => {
    res.send('첫페이지 출력된다')
})

app.use('/getsend', getsend)
app.use('/postsend', postsend)
app.use('/sqlsend', sqlsend)

app.listen(8080, () => {
    console.log('콘솔창을 확인해봐 서버구동완료')
})
