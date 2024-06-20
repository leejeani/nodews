const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
/*
nunjucks.configure('views',{
    express:app,
})

app.set('view engine', 'html');//
app.use(bodyParser.urlencoded({extended:false})); //객체 들어감. 추가 2 
app.use(express.static('public'));
*/
const users = [
    { id: "qqqq", pw: "1111" },
    { id: "good", pw: "bye1" },
];

router
    .get("/",(req,res)=>{
        let loginid;
        if (req.user){
            loginid  = req.user;
        } 
        
        res.render('index', { loginid:loginid, center:'link3/center'});
    })
    .get("/getdata",(req,res)=>{
        console.log('getdata');
        return res.send(users);
    })
    .post("",(req,res)=>{

    });

module.exports = router;