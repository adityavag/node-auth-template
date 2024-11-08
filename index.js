const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute');

const app = express();
app.use(express.json());
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(`Database Not Connected \n${err}`)
    })

app.use('/users/', authRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server Running @ ${process.env.PORT}`)
});
