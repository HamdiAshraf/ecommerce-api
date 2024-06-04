
const asyncHandler = require("express-async-handler")
const { User } = require('../models/User')
const { generateToken } = require('../utils/generateToken')
const bcrypt = require('bcryptjs')
const appError = require('../utils/appError')
const { validationResult } = require('express-validator')
const httpStatusText = require('../utils/httpStatusText')


exports.register = asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(appError.create(errors.array().map(err => err.msg), 400, httpStatusText.FAIL));

    }
    const existUser = await User.findOne({ email })
    if (existUser) {
        return next(appError.create('user already exist', 400, httpStatusText.FAIL));
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin
    });
    const token = await generateToken({ email: newUser.email, id: newUser._id, isAdmin: newUser.isAdmin })
    newUser.token = token;

    await newUser.save();

    return res.status(200).json({ status: 'success', data: { newUser } })
})


exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(appError.create(errors.array().map(err => err.msg), 400, httpStatusText.FAIL));


    }
    const user = await User.findOne({ email })
    if (!user) {
        return next(appError.create('user not found', 404, httpStatusText.FAIL));
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
        return next(appError.create('incorrect password', 400, httpStatusText.FAIL));
    }
    const token = await generateToken({ email: user.email, id: user._id, isAdmin: user.isAdmin })
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { token: token } })
})