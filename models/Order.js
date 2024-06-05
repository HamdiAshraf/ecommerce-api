const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },


    product: {
        type: Array
    }
})



exports.Order = mongoose.model('Order', OrderSchema)