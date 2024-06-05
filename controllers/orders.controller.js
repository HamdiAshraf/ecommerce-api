const { Order } = require('../models/Order')
const asyncHandler = require("express-async-handler")
const mongoose = require('mongoose')



exports.addOrder = asyncHandler(async (req, res, next) => {
    console.log(req.currentUser)
    let newOrder = await new Order({
        user: req.currentUser.id,
        product: req.body.product
    })


    newOrder = await newOrder.save();


    if (!newOrder) {
        return res.status(404).json({ status: "fail", message: 'this order can\'t be created ' })

    }
    return res.status(201).json({ status: "success", data: { newOrder } })



})


exports.getAllOrders = asyncHandler(async (req, res) => {
    let mongooseQuery = Order.find({}, { "-__v": false }).populate('user', 'firstName lastName');
    const orders = await mongooseQuery;
    return res.status(200).json({ status: "success", data: { orders } })
})

exports.getOrderById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ status: "fail", message: 'invalid order id' })

    }

    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({ status: "fail", message: 'order not found' })
    }

    return res.status(200).json({ status: "success", data: { order } });



})

exports.updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        return res.status(404).json({ status: 'fail', message: 'Order not found' });
    }
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    return res.status(200).json({ status: 'success', data: { updatedOrder } });
})


exports.deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        return res.status(404).json({ status: 'fail', message: 'Order not found' });
    }
    const deletedOrder = await Order.findByIdAndDelete(id);



    return res.status(204).json({ status: 'success', data: null });
});