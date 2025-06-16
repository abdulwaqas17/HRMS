let express = require('express');
let router = express.Router();
const createCompanyRequest = require('../../controllers/companies/company-request');



router.post('/company-request',createCompanyRequest)

module.exports = router;