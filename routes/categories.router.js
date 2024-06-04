const { Router } = require('express')
const { getAllCategories, addCategory,getCategoryById,updateCategory,deleteCategory } = require('../controllers/category.controller')
const router = Router();

router.route('/').get(getAllCategories).post(addCategory)
router.route('/:id').get(getCategoryById).patch(updateCategory).delete(deleteCategory)



module.exports = router;