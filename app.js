require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

const app = express();
const httpStatusText = require('./utils/httpStatusText')


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
app.use(`${api}/users`, usersRoute)

// Global error handler
app.use((error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let statusText = error.statusText || httpStatusText.FAIL;
    let message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: statusText,
        message: message,
    });
});
//global middleware for handle not found routes
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available', code: 404 })

})



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