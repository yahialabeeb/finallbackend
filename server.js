const express = require('express') // require the express package
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const axios = require('axios');
let port = process.env.PORT
let mongourl = process.env.MONGO_URL
app.use(express.json());
const mongoose = require("mongoose");
mongoose.connect(mongourl, { useNewUrlParser: true });

const { getAll, getFav, addFav, deleteFav, updatefav } = require('./helpers')

app.get('/getall', getAll)

app.post('/addfav', addFav)

app.get('/getfav', getFav)

app.delete('/deletefav', deleteFav)

app.put('/updatefav', updatefav)


app.listen(port, () => {
    console.log(`LISTEN ON ${port}`);
})
