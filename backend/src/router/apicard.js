const express = require("express");
const router = express.Router();
const Card = require("../controller/card");
const middlewareController = require("../controller/middlewareController")
const middlewareToken = require("../controller/middlewareToke");
router.post( "/insertCard", middlewareToken.verifyToken , middlewareController.checkSoLuong , Card.HandleInsertCard);
router.get('/getCardItem' , middlewareToken.verifyToken, Card.HandleGetCard);
router.delete('/deletecart/:id' , middlewareToken.verifyToken , Card.HandleDeleteCart)
module.exports = router;
