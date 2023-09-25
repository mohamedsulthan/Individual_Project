var express = require('express');
var router = express.Router();
const userController = require("../models/controllers/UserControllers")

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/verify', userController.verify)

module.exports = router;