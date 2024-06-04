const asyncHandler = require("express-async-handler")
const { Category } = require('../models/Category')

exports.getAllCategories = asyncHandler(async (req, res) => {
    let mongooseQuery = Category.find({}, { "-__v": false });
    const categories = await mongooseQuery;
    return res.status(200).json({ status: "success", data: { categories } })
})


exports.getCategoryById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById(id, { "-__v": false });

    if (!category) {
        return res.status(404).json({ status: "fail", message: 'category not found' });
    }

    return res.status(200).json({ status: "success", data: { category } });



})

exports.addCategory = asyncHandler(async (req, res) => {

    let newCategory = new Category({
        name: req.body.name,
        color: req.body.color,
        icon: req.body.icon
    })

    newCategory = await newCategory.save();
    if (!newCategory) {
        return res.status(404).json({ status: "fail", message: 'this category can\'t be created ' })

    }
    return res.status(201).json({ status: "success", data: { newCategory } })

})



exports.updateCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = Category.findById(id);

    if (!category) {
        return res.status(404).json({ status: "fail", message: 'category not found' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id,
        {
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon
        },
        { new: true }
    )


    return res.status(200).json({ status: "success", data: { updatedCategory } })

})


exports.deleteCategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
        return res.status(404).json({ status: 'fail', message: 'category not found' });
    }

    await Category.findByIdAndDelete(id);

    return res.status(204).json({})




})