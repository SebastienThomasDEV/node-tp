
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// routeur
const BarsRouter = require("./router/BarsRouter");
const BiereRouter = require("./router/BiereRouter");
const CommandeRouter = require("./router/CommandeRouter");



// const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        console.log('Connected to MongoDB');
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server is running on port ${process.env.SERVER_PORT}`);
        });
    }).catch((err) => {
        console.log(err);
        console.log("Not connected to MongoDB");
    });

app.use('/commandes', CommandeRouter);
app.use('/biere', BiereRouter);
app.use('/bars', BarsRouter);


