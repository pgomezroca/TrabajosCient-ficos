const mysql = require ('mysql')


function insert (connection,data,callback) {
  const sqlInsert="INSERT INTO users(edad,localidad,domicilio,telefono,nombre) VALUES(?,?,?,?,?) "
  const query=mysql.format(sqlInsert, [ data.edad, data.localidad, data.domicilio, data.telefono, data.nombre])
connection.query(query,(err,result)=>{
if (err)throw err;
callback(result)
})
}
module.exports={insert}