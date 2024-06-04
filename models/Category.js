const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    icon: {
        type: String
    }
})



exports.Category = mongoose.model('Category', CategorySchema)