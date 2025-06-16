let express = require('express');
const createServiceProvider = require('../../controllers/service-provider/create-sp');
let router = express.Router();

router.post('/sp/create',createServiceProvider)

module.exports = router;
