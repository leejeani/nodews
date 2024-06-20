
var db_connect = require('./node_sql/db_connect');
var db_sql = require('./node_sql/db_sql');



conn = db_connect.getConnection();

let id = 'id04';
let pwd = 'pwd44';
let name = '김말숙';
let values = [pwd,name,id];

conn.query(db_sql.cust_update, values, (e, result, fields) => {
    if(e){
        console.log('Update Error');
        console.log('Error Message:')+e;
    }else{
        console.log('Update OK !');
    }
    db_connect.close(conn);
});
