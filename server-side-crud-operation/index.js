const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())


// simpleDbUser
// ITdVttcbBB97yVh9

// const uri = "mongodb+srv://simpleDbUser:<db_password>@cluster0.ke2w89y.mongodb.net/?appName=Cluster0";
const uri = "mongodb+srv://simpleDbUser:ITdVttcbBB97yVh9@cluster0.ke2w89y.mongodb.net/?appName=Cluster0";

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

    const usersDb = client.db('usersDb')
    const usersCollection = usersDb.collection('users')


    // send data to database
    app.post('/users', async(req, res)=>{
        const newUser = req.body
        console.log('hitting the users post api', newUser)
        const result = await usersCollection.insertOne(newUser);
        res.send(result)
    })


    // read data from database
    app.get('/users', async(req, res)=>{
        const cursor = usersCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    // get single data from database
    app.get('/users/:id', async(req, res)=>{
        const id = req.params.id
        const query = {_id : new ObjectId(id)}
        const result = await usersCollection.findOne(query)
        res.send(result)
    })

    // delete data from database
    app.delete('/users/:id', async(req, res)=>{
        // console.log(req.params.id)
        // console.log('delete a user from database')
        const id = req.params.id
        const query = {_id : new ObjectId(id)}
        const result = await usersCollection.deleteOne(query);
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("Simple crud operation is running")
})

app.listen(port, ()=>{
    console.log(`server is going on ${port}`)
})
