const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1

router
    .get("/",(req,res)=>{
        let loginid;
        if (req.user){
            loginid  = req.user;
        } 
        res.render('index', { loginid:loginid, center:'link1/center'});
    })
    .post("",(req,res)=>{

    });

module.exports = router;