var express = require('express')
var app = express();

app.get('/', (req,res,next) => {
    res.send('첫페이지 출력된다')
})

app.listen(8080, () => {
    console.log('콘솔창을 확인해봐 서버구동완료')
})
