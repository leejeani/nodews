
var db_connect = require('./db/db_connect');
var db_sql = require('./db/db_sql');



conn = db_connect.getConnection();

let id = 'id04';

conn.query(db_sql.cust_delete, id, (e, result, fields) => {
    if(e){
        console.log('Delete Error');
        console.log('Error Message:')+e;
    }else{
        console.log('Delete OK !');
    }
    db_connect.close(conn);
});