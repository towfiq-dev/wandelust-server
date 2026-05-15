const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { createRemoteJWKSet, jwtVerify } = require('jose-cjs')
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

const JWKS = createRemoteJWKSet(
  new URL(`${process.env.CLIENT_URL}/api/auth/jwks`)
)
const verifyToken = async(req, res, next)=>{
  const authHeader = req?.headers.authorization
  if (!authHeader) {
    return res.status(401).json({message: 'Unauthorized'})
  }
  const token = authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try{
  const {payload} = await jwtVerify(token, JWKS)
  console.log(payload);
  next()
  
  }catch (error) {
  return res.status(403).json({
    message: "Forbidden"
  })
  }
}

async function run() {
  try {

    //await client.connect();

    const db = client.db("wanderlust");
    const destinationCollection = db.collection("destination");
    const bookingCollection = db.collection("bookings");

    app.post('/destination', async(req, res)=>{
      const destinationData = req.body
      const result = await destinationCollection.insertOne(destinationData)
      res.send(result)
    })

    app.post('/bookings', verifyToken, async(req, res)=>{
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

    app.get('/featured', async(req, res)=>{
      const result = await destinationCollection.find().limit(5).toArray()
      res.send(result)
    })

    app.get('/destination/:id', verifyToken, async(req, res)=>{
      const id = req.params.id
      const query={
        _id: new ObjectId(id)
      }
      const result = await destinationCollection.findOne(query)
      res.send(result)
    })

    app.delete('/destination/:id', verifyToken,
      async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await destinationCollection.deleteOne(query)
      res.send(result)
    })

    app.delete('/bookings/:id', verifyToken,
      async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query)
      res.send(result)
    })

    app.patch('/destination/:id', verifyToken,
      async(req, res)=>{
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

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res)=>{
  res.send('server is running now')
})

app.listen(port, ()=>{
  console.log(`server is running on port http://localhost:${port}`);
})
