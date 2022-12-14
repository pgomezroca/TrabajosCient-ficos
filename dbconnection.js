const mysql = require ('mysql')

const db_con = mysql.createConnection({
  host: '127.0.0.1' ,
  user:'root',
  password:'',
  database:'test'
 })
 db_con.connect((err)=>{
   if(err)throw err;
   console.log('conected to database');
 
 })



 module.exports ={db_con}