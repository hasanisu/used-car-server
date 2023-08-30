const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const user = require('./routes/user');
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(cors())
app.use(express.json())

//mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dkggbgt.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    //declare collection


    const userCollection = client.db("usedCar").collection('users');
    const categoryCollection = client.db("usedCar").collection("categories")
    const toyotaCollection = client.db("usedCar").collection("toyota")
    const hondaCollection = client.db("usedCar").collection("honda")
    const carsCollection = client.db("usedCar").collection("cars")
    const reconditionCategory = client.db("usedCar").collection("category") 



/*  All Route Start From Here */

//get user by email
app.get('/user/:email', async(req, res)=>{
  const email = req.params.email;
  const query = {email: email}
  console.log(query)
  const result = await userCollection.findOne(query)
  res.send(result)

})

    //Save user to DB
    app.put('/user/:email', async (req, res) => {
    const email = req.params.email;
    console.log(email)
    const user = req.body;
    const filter = { email: email }
    const options = { upsert: true }
    
    const docUpdate = {
      $set: user
    }
    const result = await userCollection.updateOne(filter, docUpdate, options)

    // const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    //   expiresIn: '1d'
    // })
    // res.send({ result, token })

    console.log(result,'result')
    res.send(result)
  })
    
//ALL CARS GET, POST, PUT, DELETE START FROM HERE

  app.get('/usedCarCategory', async(req, res)=>{
    const query = {}
    const result = await reconditionCategory.find(query).toArray();
    res.send(result)
  })


  app.get('/categories', async(req, res)=>{
    const query = {}
    const result = await categoryCollection.find(query).toArray();
    res.send(result)
  })



  //Get All cars by id 
  app.get('/all-car/:id', async(req, res) =>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await carsCollection.findOne(query)
    res.send(result)
  })



  //get All toyota cars
  app.get('/all-cars/toyota', async(req, res) =>{
    // const maker = req.query.maker;
    // const car = req.body;
    const query = { maker :{$in : ['toyota', 'Toyota', 'TOYOTA'] }}
    const cursor = carsCollection.find(query)
    const result = await cursor.toArray()
    res.send(result)
  })

  //get All Honda cars
  app.get('/all-cars/honda', async(req, res) =>{
    const query = { maker :{$in : ['honda', 'Honda', 'HONDA'] }}
    const cursor = carsCollection.find(query) 
    const result = await cursor.toArray()
    res.send(result)
  })

  //Get All New arrival 2023 cars 
  app.get('/new-arrivals', async(req, res) =>{
    const query = { arrival_year :{$eq : '2023' }}
    const cursor = carsCollection.find(query) 
    const result = await cursor.toArray()
    res.send(result)
  })


   //Get All Sale 2023 cars
   app.get('/car-sale', async(req, res) =>{
    const query = { sale :{$gt : 0 }}
    const cursor = carsCollection.find(query) 
    const result = await cursor.toArray()
    res.send(result)
  })


   //get All recondition category cars

   app.get('/category/:id', async (req, res) =>{
    const id = req.params.id;
    const filter = {brand_id:{$eq: id}}
    const result = await carsCollection.find(filter).toArray()
    res.send(result)
   })






  // HOST INFO START FROM HERE
  // app.post('/host-request', async(req, res) =>{
  //   const sellerRequest = req.body; 
  //   const 
  // })






    console.log("You successfully connected to MongoDB!");

  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})