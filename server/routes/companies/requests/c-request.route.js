let express = require('express');
let router = express.Router();
const getCompaniesRequest = require('../../../controllers/companies/requests/get-req-companies');
const createCompanyRequest = require('../../../controllers/companies/requests/company-request');



router.post('/company-request',createCompanyRequest)
router.get('/companies-request',getCompaniesRequest);

module.exports = router;