const mysql = require("mysql");
const con = mysql.createConnection({
   host : "localhost",                              /*  {  }*/
   user : "root",
   password : "",
   database : "fyp"
 });

 console.log(__dirname)

 /*con.connect(function(error){ 
  if(error){  
console.log("error")
  }
  else{  
console.log("connected")
  }
  })*/

 
 module.exports=con;