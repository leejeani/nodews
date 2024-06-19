const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1

router
    .get("/",(req,res)=>{
        var url = "/check?center=link1/center";
        res.redirect(url);
    })
    .post("",(req,res)=>{

    });

module.exports = router;