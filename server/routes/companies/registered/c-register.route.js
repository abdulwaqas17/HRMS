let express = require('express');
const createCompanyRegister = require('../../../controllers/companies/registered/company-register');
const getRegisteredCompanies = require('../../../controllers/companies/registered/get-reg-companies');
const upload = require('../../../middlewares/upload.md');
let router = express.Router();




router.post('/company-register/:id',upload.single('companyLogo'),createCompanyRegister)
router.get('/registered-companies',getRegisteredCompanies);

module.exports = router;