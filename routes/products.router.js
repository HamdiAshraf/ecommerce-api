const { Router } = require('express')
const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct, getFeatured } = require('../controllers/products.controller')
const { allowedTo } = require('../middlewares/allowedTo')
const { verifyToken } = require('../middlewares/verifyToken')
const router = Router();

router.route('/').get(verifyToken, getAllProducts).post(verifyToken, addProduct)
router.route('/:id').get(verifyToken, getProductById).patch(verifyToken, allowedTo, updateProduct).delete(verifyToken, allowedTo, deleteProduct)

router.route('/get/featured').get(getFeatured)


module.exports = router;