
var db_connect = require('./node_sql/db_connect');
var db_sql = require('./node_sql/db_sql');



conn = db_connect.getConnection();

let id = 'id04';
let pwd = 'pwd04';
let name = '이말숙';
let values = [id,pwd,name];

conn.query(db_sql.cust_insert, values, (e, result, fields) => {
    if(e){
        console.log('Insert Error');
        console.log('Error Message:')+e;
    }else{
        console.log('Insert OK !');
    }
    db_connect.close(conn);
});


