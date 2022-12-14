const express= require('express')
require('dotenv').config()
const bodyParser=require('body-parser')
const cors=require('cors')
const app= express()
const mysql=require('mysql')

//const{insert}= require('./operaciones')
//----------------------//
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
//---------- conexion bd//

const db = mysql.createConnection({
  host: process.env.DBHOST ,
  user:process.env.DBUSER,
  password:process.env.DBPASS,
  database:process.env.DBDATABASE,
 })
 console.log(process.env.PORT)
 console.log(process.env.DBHOST)
 db.connect((err)=>{
   if(err)throw err;
   console.log('conected to database');
 })
  const PORT = process.env.PORT || 5000
 app.listen(PORT,()=>{
  console.log('running on port' + PORT)
})

 //-----end points----//


app.get('/',(req,res)=>{
  res.send('aca estas en /')
})


 //----guardar pacientes---//
app.post('/Archivar',(req,res)=>{
  const lastName=req.body.lastName
  const firstName=req.body.firstName
  const age=req.body.age
  const dni=req.body.dni
  const fractura=req.body.fractura
  
  
 const sqlInsert='INSERT INTO miembroSuperior(lastName,firstName,age,dni,fractura)values(?,?,?,?,?)'
  db.query(sqlInsert,[lastName,firstName,age,dni,fractura],(err,result)=>{
    console.log(result)
    res.json({msg:'ok'});
    return true;
  })
})
//----ver todos los pacientes guardados----//

app.get('/ver',(req,res)=>{
  const sqlSelect= "SELECT * FROM miembroSuperior ";
  db.query(sqlSelect,(err,result)=>{
    if (err)throw err
    res.send(result)
    console.log(result)
  }) 
})

//----ver por dni---//

app.get('/por/:dni',(req,res)=>{
  const dni=req.params.dni
  const sqlSelectd= "SELECT * FROM miembroSuperior WHERE dni= ? ";
   
  db.query(sqlSelectd,dni,(err,result)=>{
    if (err)throw err
    res.send(result)
    console.log(result)
  }) 
})

//----ver fracturas especificas---//
app.get('/con/:fractura',(req,res)=>{

  const fractura=req.params.fractura
  const sqlSelectWhere = "SELECT * FROM miembroSuperior WHERE fractura= ?";
  
  db.query(sqlSelectWhere,fractura,(err,result)=>{
    if(err)throw err
    res.send(result)
    console.log(result)
  })
})
//----registrar usuarios---//

const saltRound = 10;
app.post('/register', (req, res)=> {
 const mail=req.body.mail
 const password=req.body.password 
db.query('INSERT INTO users (mail,password)VALUES (?,?)',
[mail,password],
(err,result)=>{
  console.log(err)
})
}         
)  
//---login-----//
app.post('/login',(req,res)=>{
  const mail=req.body.mail
  const password=req.body.password
    db.query("SELECT * FROM users WHERE mail= '?' AND password='?' ", (err,result)=>{
    if (err){res.send({err:err})}
    
         if(result){
           res.send(result)
          }
           else
             {res.send({message:'no user found'})}
           
      })
  })