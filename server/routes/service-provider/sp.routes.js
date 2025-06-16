let express = require('express');
let router = express.Router();
const createServiceProvider = require('../../controllers/service-provider/create-sp');

router.post('/create/sp',createServiceProvider)

module.exports = router;
