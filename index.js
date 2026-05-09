const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config()
const uri = process.env.MONGODB_URI
const app = express()
const PORT = process.env.PORT
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
    const db = client.db('wanderlust')
    const destinationCollection = db.collection('destinations')

    app.get('/destination', async(req,res)=>{
      const destination = await destinationCollection.find().toArray()
      res.send(destination)
    })

    app.post('/destination', async(req, res)=>{
      const destinationData = req.body
      const result = await destinationCollection.insertOne(destinationData)
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
  res.send('Server is running')
})

app.listen(PORT, ()=>{
  console.log(`server is running on port http://localhost:${PORT}`);
  
})