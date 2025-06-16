let express = require('express');
let router = express.Router();
const createOwner = require('../../controllers/owner/create-owner');


router.post('/create/owner',createOwner)

module.exports = router;
