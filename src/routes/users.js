const express = require('express');

const UserController = require('../controller/users');
const verifyJWT = require('../middleware/verifyJWT')
// const registerController = require('../controllers/registerController');

const router = express.Router();

// CREATE -POST
router.get('/',verifyJWT, UserController.getAllUsersRole);

// READ - GET
router.post('/',UserController.createNewUser);

// UPDATE - PATCH
router.patch('/:idUser', UserController.updateUser);

// DELETE - DELETE
router.delete('/:idUser',UserController.deleteUser)

// REGISTER - POST
// router.post('/', registerController.handleNewUser);

module.exports = router;