
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// routers

const BarRouter = require("./router/BarRouter");
const BiereRouter = require("./router/BiereRouter");
const CommandeRouter = require("./router/CommandeRouter");
const BiereCommandeRouter = require('./router/BiereCommandeRouter');

// const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        console.log('Connected to MongoDB');
        app.listen(process.env.SERVER_PORT, () => {
            console.log('Server is running on port 3000');
        });

    }).catch((err) => {
        console.log(err);
        console.log("Not connected to MongoDB");
    });

app.use('/', CommandeRouter);
app.use('/bars', BarRouter);
app.use('/', BiereRouter);
app.use('/', BiereCommandeRouter)
