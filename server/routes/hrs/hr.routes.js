let express = require('express');
const addHR = require('../../controllers/hrs/add-hr');
let router = express.Router();



router.post('/add/hr/:id',addHR)

module.exports = router;
