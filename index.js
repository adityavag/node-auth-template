const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(`Database Not Connected \n${err}`)
    })

app.listen(process.env.PORT, () => {
    console.log(`Server Running @ ${process.env.PORT}`)
});

