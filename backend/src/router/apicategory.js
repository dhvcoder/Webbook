const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');
const middlewareToken = require('../controller/middlewareToke');
router.get('/getcategory' , CategoryController.get_listCategory);

router.post('/addcategory'  , middlewareToken.checkRoleManager , CategoryController.HandleInsertCategory);
router.get('/getcategory/:id' , middlewareToken.checkRoleManager , CategoryController.HandlegetByID);
router.put('/updatecategory/:id' , middlewareToken.checkRoleManager , CategoryController.HandleUpdate);
router.delete('/deletecategory/:id', middlewareToken.checkRoleManager , CategoryController.HandleDelete);


module.exports = router;