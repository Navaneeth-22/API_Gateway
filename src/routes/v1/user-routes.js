const express = require('express');
const {UserController} = require("../../controllers")
const {AuthMiddleware} = require("../../middlewares")
const router = express.Router();

router.post("/signup",UserController.createUser);
router.post("/login",UserController.login);
router.post("/add-role",AuthMiddleware.Authenticated,AuthMiddleware.isAdmin,UserController.addRole);


module.exports = router;