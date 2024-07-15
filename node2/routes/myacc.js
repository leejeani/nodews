const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1


// /link1 요청시 진행
router
    .get("/",(req,res)=>{
        let loginid, acc;
        if (req.user){
            loginid  = req.user.id;
            acc  = req.user.acc;
        } 
        res.render('index', { loginid:loginid,acc:acc, center:'myacc/center'});
    })
    .post("",(req,res)=>{

    });

module.exports = router;