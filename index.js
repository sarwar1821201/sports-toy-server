const express = require('express');
const app= express();
//const jwt = require('jsonwebtoken');
const cors= require('cors');
require('dotenv').config();
const port= process.env.PORT || 5000;


app.use(cors());
app.use(express.json())



app.get('/', (req,res)=>{
    res.send('Sports Toy Gallery Server Running')
} )

app.listen( port, () =>{
    console.log(`Sports Toy server running on port: ${port}`)
} )