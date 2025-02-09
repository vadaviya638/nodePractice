const mongoose = require('mongoose')
require("dotenv").config(); 

const dbConnection= async() =>{
    try{
const connection = await mongoose.connect(process.env.CONNECTION_STRING)
console.log(
    "Database connected: ",
    connection.connection.host,
    connection.connection.name
  );
} catch (err) {
  console.log(err);
  process.exit(1);
}
}

module.exports=dbConnection