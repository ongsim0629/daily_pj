const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/sound/:name', (req, res) => {
    // 중괄호 key 값으로 간단하게 접근 가능 
    const { name } = req.params
    
    if(name == "dog"){
        res.json({sound: '멍멍'})
    } else if(name == "cat"){
        res.json({sound: '야옹'})
    } else if(name == "pig"){
        res.json({sound: '꿀꿀'})
    } else {
        res.json({'sound':'알 수 없음'})
    }
})

app.get('/user/:id', (req, res) => {
    //const q = req.params
    //console.log(q.id)
    const q = req.query
    console.log(q)

    res.json({'userid': q.name})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})