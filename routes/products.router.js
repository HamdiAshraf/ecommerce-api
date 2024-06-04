const {Router}=require('express')
const {getAllProducts,addProduct}=require('../controllers/products.controller')
const router=Router();

router.route('/').get(getAllProducts).post(addProduct)



module.exports=router;