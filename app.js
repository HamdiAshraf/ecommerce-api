require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express();

const productsRoute = require('./routes/products.router')
const categoriesRoute = require('./routes/categories.router')
const ordersRoute = require('./routes/orders.router')
const usersRoute = require('./routes/users.router')


const PORT = process.env.PORT || 3000;
const api = process.env.API_URI;



app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny')) //logger



app.use(`${api}/products`, productsRoute)
app.use(`${api}/categories`, categoriesRoute)
// app.use(`${api}/orders`, ordersRoute)
// app.use(`${api}/users`, usersRoute)




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