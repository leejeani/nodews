const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   
// Database 연동
var db_connect = require('../node_sql/db_connect');
var db_sql = require('../node_sql/db_sql');

router
    .get("/",(req,res)=>{
        let loginid;
        if (req.user){
            loginid  = req.user;
        } 
        
        res.render('index', { loginid:loginid, center:'link3/center'});
    })
    .get("/getdata",(req,res)=>{
        conn = db_connect.getConnection();
            
            conn.query(db_sql.cust_select, function (err, result, fields) {
                const users = JSON.stringify(result);
                return res.json(JSON.parse(users));
            });


    })
    .post("",(req,res)=>{

    });

module.exports = router;