const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1

router
    .get("/",(req,res)=>{
        let loginid;
        const datas = [{'name':'data1'},{'name':'data2'}];
        if (req.user){
            loginid  = req.user;
        } 
        if (loginid !== undefined) {
            res.render('index', { loginid:loginid, center:'link2/center', datas:datas });
        } else {
            res.redirect('/login');
        }
    })
    .post("",(req,res)=>{

    });

module.exports = router;