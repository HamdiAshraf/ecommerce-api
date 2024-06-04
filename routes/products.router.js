const { Router } = require('express')
const { getAllProducts, addProduct, getProductById, updateProduct, deleteProduct,getFeatured } = require('../controllers/products.controller')
const router = Router();

router.route('/').get(getAllProducts).post(addProduct)
router.route('/:id').get(getProductById).patch(updateProduct).delete(deleteProduct)

router.route('/get/featured').get(getFeatured)


module.exports = router;