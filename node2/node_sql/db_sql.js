module.exports = {
    cust_select:'SELECT * FROM cust',
    cust_select_one:'SELECT * FROM cust WHERE id = ?',
    cust_insert:'INSERT INTO cust (id,pwd,name, acc) VALUES (?,?,?,?)',
    cust_update:'UPDATE cust SET pwd=?, name=? WHERE id=?',
    cust_delete:'DELETE FROM cust WHERE id = ?'
}