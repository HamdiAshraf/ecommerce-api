const { Router } = require('express')
const { register, login } = require('../controllers/users.controller')
const { body } = require('express-validator')
const router = Router();

router.route('/register').post([
    body('firstName').notEmpty().withMessage('firstName field is required'),
    body('lastName').notEmpty().withMessage('lastName field is required'),
    body('email').notEmpty().withMessage('email field is required')
        .isEmail().withMessage('invalid email')
    ,

    body('password').notEmpty().withMessage('password field is required')
        .isLength({ min: 6 }).withMessage('password must be at least 6 characters')



], register)

router.route('/login').post([

    body('email').notEmpty().withMessage('email field is required')
        .isEmail().withMessage('invalid email')
    ,

    body('password').notEmpty().withMessage('password field is required')




], login)




module.exports = router;