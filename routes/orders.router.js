const { Router } = require('express')
const { addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orders.controller')
const { allowedTo } = require('../middlewares/allowedTo')
const { verifyToken } = require('../middlewares/verifyToken')
const router = Router();


router.route('/').get(verifyToken, getAllOrders).post(verifyToken, addOrder)
router.route('/:id').get(verifyToken, getOrderById).patch(verifyToken, updateOrder).delete(verifyToken, deleteOrder)


module.exports = router;