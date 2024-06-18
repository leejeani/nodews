require('dotenv').config();
const express=require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
// const mysql = require('mysql');
const app = express();
const port = process.env.SERVER_PORT || 3000;

nunjucks.configure('views',{
    express:app,
})

app.set('view engine', 'html');
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public'));


// let connection = mysql.createConnection({   //method라 () . 인자값- 객체 
    
//     host:process.env.DB_HOST,
//     user:process.env.DB_USER,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DATABASE    
// });  
// // 우리가 mysql 접속하기 위해 필요한 정보를 전달하기 위함  //여기까지 설정 끝

// connection.connect();

app.get('/', (req,res)=>{
    res.render('index',{
        name:'이선문',
        id:'id01',
        pw:'1234',
    })
})

app.get('/join', (req,res)=>{
    res.render('join')
})

app.post('/impl',(req,res)=>{
    

    // connection.query("insert into handphone (name) values ('${')", (error, results)=>{
    //     if(error){
    //         console.log('error');
    //     }else{
    //         console.log('query문 성공 ');
    //     }
    // }) //query라는 곳엔 2개의 인자값 (sql 문, 익명함수) =("sql",()=>{})


    res.render('result.html',{
        anything:req.body.textbox_content,
    })
})

app.listen(port,()=>{
    console.log(`server start port:${port}`)
})