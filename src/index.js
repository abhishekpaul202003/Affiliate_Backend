const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const router = require('./routes/route')

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MongoDBURL)
    .then(() => { console.log("mongodb is connected") })
    .catch((error) => { console.log(error) })

app.use('/', router);

app.listen(8080, () => { console.log("server is running on port 8080"); });
