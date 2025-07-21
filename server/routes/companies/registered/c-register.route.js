let express = require('express');
const createCompanyRegister = require('../../../controllers/companies/registered/company-register');
const getRegisteredCompanies = require('../../../controllers/companies/registered/get-reg-companies');
const upload = require('../../../middlewares/upload.md');
const getRegisteredCompany = require('../../../controllers/companies/registered/get-reg-company');
let router = express.Router();




router.post('/company-register/:id',upload.single('companyLogo'),createCompanyRegister)
router.get('/registered-companies',getRegisteredCompanies);
router.get('/get-register-company/:companyName',getRegisteredCompany);

module.exports = router;