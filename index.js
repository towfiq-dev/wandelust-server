const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destination");
    const bookingCollection = db.collection("bookings");

    app.post('/destination', async(req, res)=>{
      const destinationData = req.body
      const result = await destinationCollection.insertOne(destinationData)
      res.send(result)
    })

    app.post('/bookings', async(req, res)=>{
      const bookings = req.body
      const result = await bookingCollection.insertOne(bookings)
      res.send(result)
    })

    app.get('/bookings/:userId', async(req, res)=>{
      const userId = req.params.userId
      const query = {userId: userId}
      const result = await bookingCollection.find(query).toArray()
      res.send(result)
    })

    app.get('/destination', async(req, res)=>{
      const result = await destinationCollection.find().toArray()
      res.send(result)
    })

    app.get('/destination/:id', async(req, res)=>{
      const id = req.params.id
      const query={
        _id: new ObjectId(id)
      }
      const result = await destinationCollection.findOne(query)
      res.send(result)
    })

    app.delete('/destination/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await destinationCollection.deleteOne(query)
      res.send(result)
    })

    app.delete('/bookings/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })

    app.patch('/destination/:id', async(req, res)=>{
      const id = req.params.id
      const query ={_id: new ObjectId(id)}
      const update = req.body

      const updated={
        $set:{
          ...update
        }
      }
      const result = await destinationCollection.updateOne(query, updated)
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
  res.send('server is running now')
})

app.listen(port, ()=>{
  console.log(`server is running on port http://localhost:${port}`);
})


// const express = require('express')
// const dotenv = require('dotenv')
// const cors = require('cors')
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// dotenv.config()
// const uri = process.env.MONGODB_URI
// const app = express()
// const PORT = process.env.PORT
// app.use(cors())
// app.use(express.json())
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {

//     await client.connect();
//     const db = client.db('wanderlust')
//     const destinationCollection = db.collection('destinations')
//     const bookingsCollection = db.collection('bookings')

//     app.post('/bookings', async(req, res)=>{
//       const bookingsData = req.body
//       const result = await bookingsCollection.insertOne(bookingsData)
//       res.send(result)
//     })

//     app.get('/bookings/:userId', async(req, res)=>{
//     const userId = req.params.userId
//     const query={
//       userId:  userId
//     }
//     const result = await bookingsCollection.find(query).toArray()
//     res.send(result)
//     })
//     app.get('/destination', async(req,res)=>{
//       const destination = await destinationCollection.find().toArray()
//       res.send(destination)
//     })

//     app.post('/destination', async(req, res)=>{
//       const destinationData = req.body
//       const result = await destinationCollection.insertOne(destinationData)
//       res.send(result)
//     })

//     app.get('/destination/:id', async(req, res)=>{
//       const id = req.params.id
//       const query ={
//         _id: new ObjectId(id)
//       }
//       const result = await destinationCollection.findOne(query)
//       res.send(result)
//     })

//     app.patch('/destination/:id', async(req, res)=>{
//       const id = req.params.id
//       const query={
//         _id:  new ObjectId(id)
//       }
//       const update = req.body
//       const updated = {
//         $set:{
//           ...update
//         }
//       }
//     const result = await destinationCollection.updateOne(query, updated)
//     res.send(result)
//     })

//     app.delete('/destination/:id', async(req, res)=>{
//       const id = req.params.id
//       const query = {
//         _id: new ObjectId(id)
//       }
//       const result = await destinationCollection.deleteOne(query)
//       res.send(result)
//     })

//     app.delete('/bookings/:id', async(req, res)=>{
//     const id = req.params.id
//      const query = { 
//       _id: new ObjectId(id) 
//     }
//     const result = await bookingsCollection.deleteOne(query)
//     res.send(result)
//     })
    
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {

//     //await client.close();
//   }
// }
// run().catch(console.dir);

// app.get('/', (req, res)=>{
//   res.send('Server is running')
// })

// app.listen(PORT, ()=>{
//   console.log(`server is running on port http://localhost:${PORT}`);
  
// })