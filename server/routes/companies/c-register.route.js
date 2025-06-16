let express = require('express');
const createCompanyRegister = require('../../controllers/companies/company-register');
let router = express.Router();




router.post('/company-register/:id',createCompanyRegister)

module.exports = router;