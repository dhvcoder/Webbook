const express = require("express");
const router = express.Router();
const UserContrller = require("../controller/userContrller");
const RoleUser = require('../controller/roleController');
const middlewareToke = require("../controller/middlewareToke");

router.get("/getAlluser", UserContrller.HandlegetAllUser);
router.post('/signup' , UserContrller.HandleSignUp );
router.post('/login' , UserContrller.HandlLogin );
router.delete('/logout' , middlewareToke.logout );
router.get('/checkToken' , middlewareToke.checkRoleEmployees, UserContrller.HandlCheckToken );
router.get('/getAllRole' , RoleUser.HandlegetRole);
router.get('/getByIdUser/:id' , middlewareToke.checkRoleManager, UserContrller.HandleGetByID);
router.put('/edit/:id' , middlewareToke.checkRoleAdmim ,  UserContrller.HanleEdit);
router.delete('/deleteUser/:id' , middlewareToke.checkRoleAdmim , UserContrller.HandleDelete)
module.exports = router ;