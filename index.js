
const express = require('express');
const app = express();
require('dotenv').config();
app.use(express.json());
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI).then((res) => {
    console.log('Connected to MongoDB');
    app.listen(process.env.SERVER_PORT, () => {
        console.log('Server is running on port 3000');
    });
    // app.use('/api');
}).catch((err) => {
    console.log(err);
    console.log("Not connected to MongoDB");
});

