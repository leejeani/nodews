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
router
    .get("/",(req,res)=>{
        var url = "/check?center=link2/center";
        res.redirect(url);
    })
    .post("",(req,res)=>{

    });

module.exports = router;