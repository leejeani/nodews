var db_connect = require(__dirname+'/db/db_connect');
var db_sql = require(__dirname+'/db/db_sql');

conn = db_connect.getConnection();

conn.query(db_sql.cust_select, function (err, result, fields) {

    if(err){
        console.log('Select Error');
        console.log('Error Message:')+e;
    }else{
        console.log(result);
        console.log(JSON.stringify(result));
    }
    db_connect.close(conn);

});

