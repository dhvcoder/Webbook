const express = require("express");
const router = express.Router();
const middlewareToken = require("../controller/middlewareToke");
const middlewareController = require("../controller/middlewareController");
const payment = require("../controller/checkout")
router.post("/paymet", middlewareToken.verifyToken, middlewareController.checkQuanlityOrder , payment.hanleCPayment);

module.exports = router;