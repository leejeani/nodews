const express=require('express');
const app = express();
const router = express.Router();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser')   //body parser 추가 1
var db_connect = require('../db/db_connect');
var db_sql = require('../db/db_sql');

router
    .get("/",(req,res)=>{
        let loginid;

        if (req.user){
            loginid  = req.user;
        } 
        if (loginid !== undefined) {

            conn = db_connect.getConnection();
            
            conn.query(db_sql.cust_select, function (err, result, fields) {

                const low = JSON.stringify(result);
                const jsondatas = JSON.parse(low);
                res.render('index', { loginid:loginid, center:'link2/center', datas:jsondatas });
                db_connect.close(conn);
            });

           
        } else {
            res.redirect('/login');
        }
    })
    .post("",(req,res)=>{

    });

module.exports = router;