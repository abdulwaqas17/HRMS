let express = require('express');
const createOwner = require('../../controllers/owner/create-owner');

let router = express.Router();

router.post('/owner/create',createOwner)

module.exports = router;
