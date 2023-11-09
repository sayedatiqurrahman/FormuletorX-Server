const express = require('express');
const cors = require('cors');
const { MongoClient } = require("mongodb");
require('dotenv').config()
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = process.env.uri
const client = new MongoClient(uri);
console.log(uri);
async function run() {
    try {
        const database = client.db('FormulatorX');
        const Form = database.collection('Form-Data');

        app.get('/', (req, res) => {
            res.send('Hello World!')
        })

        app.get('/getFormData/:email', async (req, res) => {
            const email = req.query
            if (email) {
                const result = await Form.findOne(email)
                res.send(result)
            }
        })

        app.post('/postForm', async (req, res) => {
            const FormData = req.body
            if (FormData) {
                const result = await Form.insertOne(FormData)
      
                res.send(result)
            }
        })


        app.listen(port, () => {
            console.log('Listening on port', port)
        })
    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}

run().catch(console.dir);
