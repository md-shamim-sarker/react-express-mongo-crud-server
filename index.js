const express = require('express');
const cors = require('cors');
const {MongoClient, ServerApiVersion} = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});

async function run() {
    try {
        const database = client.db("userdb");
        const collection = database.collection("users");

        // C from CRUD
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await collection.insertOne(user);
            res.send(result);
            console.log('Data added successfully...');
        });

        // R from CRUD
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = collection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        });

    } catch(error) {
        console.log(error.message);
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});