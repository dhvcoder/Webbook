const express = require("express");
const router = express.Router();
const Order = require("../controller/orderController");
const middlewareToken = require("../controller/middlewareToke");
const middlewareController = require("../controller/middlewareController");
router.post('/insertOrder' , middlewareToken.verifyToken , middlewareController.checkQuanlityOrder , Order.HandleInsertOrder);
router.get('/getOrder' , middlewareToken.verifyToken , Order.handGetlOrder);
router.put('/updateOrder/:id_order' , middlewareToken.verifyToken , Order.HandleUpStatusOrder);
router.put('/xacnhandonhang/:id_order' , middlewareToken.verifyToken , Order.HandleOrderconfirmation);
router.put('/mualai/:id_order' , middlewareToken.verifyToken , Order.HandlMualai);
router.get('/getAllOrder', middlewareToken.checkRoleEmployees, Order.HandleGetAllOrder);
router.get('/getByIdOrder/:id_order', middlewareToken.checkRoleEmployees, Order.HandleGetByIdOrder);
router.get('/getAllCount', middlewareToken.checkRoleEmployees, Order.HandleGetAllCount);
router.get('/getAllAmountTotal', middlewareToken.checkRoleEmployees, Order.HandleGetAll_amountTotal);

module.exports = router ;