// const express = require("express");
// const router = express.Router();



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dkggbgt.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {serverApi: {version: ServerApiVersion.v1,strict: true,
//     deprecationErrors: true,
//   }
// });

// const userCollection = client.db("usedCar").collection('users');

// router.get('/all', (req, res)=>{
//     res.send('i am checking router')
// })


// router.put('/:email', async (req, res) => {
//     const email = req.params.email;
//     const user = req.body;
//     const filter = { email: email }
//     const options = { upsert: true }
//     const docUpdate = {
//       $set: user
//     }
//     const result = await userCollection.updateOne(filter, docUpdate, options)

//     // const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
//     //   expiresIn: '1d'
//     // })
//     // res.send({ result, token })
//     res.send(result)
//   })

// module.exports = router;
