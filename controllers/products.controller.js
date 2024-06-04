
const asyncHandler = require('express-async-handler')
const { Product } = require('../models/Product')



exports.getAllProducts = asyncHandler(async (req, res, next) => {
    //filtering
    const excludedFields = ["sort", "limit", "fields", "page"]
    let queryObj = { ...req.query };
    excludedFields.forEach(field => delete queryStr[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b[gt|gte|lt|lte]\b/g, match => `$${match}`)

    //pagination
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const skip = (page - 1) * limit;


    let mongooseQuery = Product.find(JSON.parse(queryStr)).limit(limit).skip(skip);


    //sorting

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        mongooseQuery = mongooseQuery.sort(sortBy)
    }

    //fields limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        mongooseQuery = mongooseQuery.select(fields)
    } else {
        mongooseQuery = mongooseQuery.select("-__v")

    }

    const products = await mongooseQuery;
    return res.status(200).json({ status: "success", data: { products } })
})


exports.addProduct = asyncHandler(async (req, res, next) => {







})