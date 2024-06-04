const { Router } = require('express')
const { getAllCategories, addCategory, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller')
const { allowedTo } = require('../middlewares/allowedTo')
const { verifyToken } = require('../middlewares/verifyToken')
const router = Router();

router.route('/').get(verifyToken, getAllCategories).post(verifyToken, addCategory)
router.route('/:id').get(verifyToken, getCategoryById).patch(verifyToken, allowedTo, updateCategory).delete(verifyToken, allowedTo, deleteCategory)



module.exports = router;