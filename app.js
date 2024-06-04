require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const productsRoute = require('./routes/products.router')

const app = express();

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny')) //logger

const PORT = process.env.PORT || 3000;
const api = process.env.API_URI;

app.use(`${api}/products`, productsRoute)



//db connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`connected to server successfully`);
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });

}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});