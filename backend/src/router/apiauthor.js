const express = require("express");
const router = express.Router();
const AuthorContrller = require("../controller/author.controller");
const middlewareToken = require("../controller/middlewareToke");
router.get("/getAuthor" ,  AuthorContrller.HandlegetAuthor);
router.post('/insertAuthor', middlewareToken.checkRoleManager ,  AuthorContrller.HandleInsert);
router.get("/getByID/:id", middlewareToken.checkRoleManager, AuthorContrller.HandleGetById);
router.delete('/deleteAuthor/:id', middlewareToken.checkRoleManager , AuthorContrller.HandleDelete );
router.put("/updateAuthor/:id" , middlewareToken.checkRoleManager , AuthorContrller.HandleUpdate)

module.exports = router;