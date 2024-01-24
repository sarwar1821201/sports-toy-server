const express = require('express');
const app= express();
//const jwt = require('jsonwebtoken');
const cors= require('cors');
require('dotenv').config();
const port= process.env.PORT || 5000;


app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
  // console.log(process.env.DB_USER, process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.w8gsdns.mongodb.net/?retryWrites=true&w=majority`;

  // console.log(process.env.DB_USER, process.env.DB_PASS)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const database= client.db('sportsToy');
    const toyCollection= database.collection("toyItems")

  // get alltoy data fro database and send it to client site by server
    
  app.get('/getAllToy', async(req,res)=> {
    const cursor= toyCollection.find();
    const result= await cursor.toArray();
    res.send(result)
  }  )


  // get a single card data by using id
    
    app.get('/getAllToy/:id',  async(req,res) => {
        const id= req.params.id;
        const query= {_id : new ObjectId (id)  }
        const result= await toyCollection.findOne(query)
        res.send(result)
    } )

    // get some data from data by using email

    app.get('/getSomeToy' ,async(req,res) => {
      // console.log(req.query.email)

         let query= {};

         if(req.query?.email){
            query= {sellerEmail: req.query.email }
         }

        const result= await toyCollection.find(query).toArray();
        res.send(result)
    } )


    // add toy data from client to databse
    app.post('/toyItem', async(req,res)=>{
        const newToyItem= req.body;
       // console.log(newToyItem)
         const result= await toyCollection.insertOne(newToyItem)
         res.send(result)
         
    }  )

    // delete a card from the database by using id

    app.delete('/deleteToyItem/:id', async(req,res) =>{
        const id= req.params.id;
        const query= {_id : new ObjectId(id) }
        const result= await toyCollection.deleteOne(query);
        res.send(result);
    } )


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req,res)=>{
    res.send('Sports Toy Gallery Server Running')
} )

app.listen( port, () =>{
    console.log(`Sports Toy server running on port: ${port}`)
} )