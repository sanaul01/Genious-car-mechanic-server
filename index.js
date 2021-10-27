const express = require("express");
require('dotenv').config();
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hcshw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

    try{

        await client.connect();
        const database = client.db("geniusMechanic");
        const databaseServices = database.collection("srevice");

        // POST api 
        app.post('/services', async(req, res)=>{
            const services = {
                "name":"Replace tire",
                "price":2000,
                "time":2,
                "image":"https://i.ibb.co/XyY13Ty/Background-9.png"
            }

            const result = await databaseServices.insertOne(services);
            console.log(result)
        })

    }
    finally{
        // await client.close();
    }

};
run().catch(console.dir);

app.get('/', (req, res)=>{
    res.send("Geniusr Car Mechanics");
});

app.listen(port, ()=>{
    console.log('Listening Genius', port);
})