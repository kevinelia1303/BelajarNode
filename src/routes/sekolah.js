const express = require('express');

const SekolahController = require('../controller/sekolahController');

const router = express.Router();

// // READ - GET
router.get('/', SekolahController.getAllSekolah);

// // CREATE - POST
router.post('/',SekolahController.createNewSekolah);

// // UPDATE - PATCH
// router.put('/:idSekolah', SekolahController.updateSekolah);

// // DELETE - DELETE
// router.delete('/:idUser',SekolahController.deleteSekolah);

// REGISTER - POST
// router.post('/', registerController.handleNewUser);

module.exports = router;
