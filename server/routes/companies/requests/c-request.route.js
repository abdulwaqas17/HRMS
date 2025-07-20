let express = require('express');
let router = express.Router();
const getCompaniesRequest = require('../../../controllers/companies/requests/get-req-companies');
const createCompanyRequest = require('../../../controllers/companies/requests/company-request');
const getCompanyRequest = require('../../../controllers/companies/requests/get-company-req');




router.post('/company-request',createCompanyRequest)
router.get('/companies-request',getCompaniesRequest);
router.get('/get-company-request/:id', getCompanyRequest);
router.get('/company/exits/:companyName', checkCompanyExists);

module.exports = router;