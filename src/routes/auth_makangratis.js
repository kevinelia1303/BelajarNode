const express = require('express');
const router = express.Router();
const authController = require('../controller/authMakanGratis');

router.post('/', authController.handleLoginMakanGratis);

module.exports = router;