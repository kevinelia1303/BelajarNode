const express = require('express');

const UserController = require('../controller/authMakanGratis');
const verifyJWT = require('../middleware/verifyJWT');

const router = express.Router();

// READ - GET
router.post('/', UserController.handleLogin);