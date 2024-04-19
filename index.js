
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log('Connected to MongoDB');
    app.listen(process.env.SERVER_PORT, () => {
        console.log('Server is running on port 3000');
    });
    app.use('/commandes', require('./router/CommandeRouter'));
    app.use('/bars', require('./router/BarsRouter'));
    app.use('/biere', require('./router/BiereRouter'));
}).catch((err) => {
    console.log(err);
    console.log("Not connected to MongoDB");
});