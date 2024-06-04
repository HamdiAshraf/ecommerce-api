const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const { Product } = require('../models/Product')
const { Category } = require('../models/Category')




exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const results = await Product.countDocuments();
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') }
    }
    let mongooseQuery = Product.find(filter, { "-__v": false }).populate('category');
    const products = await mongooseQuery;
    return res.status(200).json({ status: "success", results, data: { products } })
})

exports.getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: "fail", message: 'invalid category id' })

    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ status: "fail", message: 'product not found' }).populate('category')
    }

    return res.status(200).json({ status: "success", data: { product } });



})
exports.addProduct = asyncHandler(async (req, res, next) => {
    if (!mongoose.isValidObjectId(req.body.category)) {
        return res.status(400).json({ status: "fail", message: 'invalid category id' })

    }
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(404).json({ status: "fail", message: 'invalid category id' })
    }

    let newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        dateCreated: req.body.dateCreated
    })

    newProduct = await newProduct.save();
    if (!newProduct) {
        return res.status(404).json({ status: "fail", message: 'this product can\'t be created ' })

    }
    return res.status(201).json({ status: "success", data: { newProduct } })






})


exports.updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ status: "fail", message: 'invalid product id' })

    }

    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ status: "fail", message: 'product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
            dateCreated: req.body.dateCreated
        },
        { new: true }
    )
    if (!updatedProduct) {
        return res.status(404).json({ status: "fail", message: 'this product can\'t be updated ' })

    }

    return res.status(200).json({ status: "success", data: { updatedProduct } })

})


exports.deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ status: 'fail', message: 'product not found' });
    }

    await Product.findByIdAndDelete(id);

    return res.status(204).json({ status: 'success', message: 'deleted successfully' })




})


exports.getFeatured = asyncHandler(async (req, res) => {

    const products = await Product.find({ isFeatured: true })
    const length = await Product.find({ isFeatured: true }).countDocuments()


    return res.status(200).json({ status: "success", results: length, data: { products } });


})