const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1


// /link1 요청시 진행
router
    .get("/",(req,res)=>{
        let loginid;
        if (req.user){
            loginid  = req.user.id;
        } 
        res.render('index', { loginid:loginid, center:'link1/center'});
    })
    .post("",(req,res)=>{

    });

module.exports = router;