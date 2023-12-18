const express = require("express");
const router = express.Router();
const Order = require("../controller/orderController");
const middlewareToken = require("../controller/middlewareToke");
router.post('/insertOrder' , middlewareToken.verifyToken , Order.HandleInsertOrder);
router.get('/getOrder' , middlewareToken.verifyToken , Order.handGetlOrder);

module.exports = router ;