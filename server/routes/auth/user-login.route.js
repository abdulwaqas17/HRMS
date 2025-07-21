let express = require('express');
const UserLogin = require('../../controllers/auth/user-login');
const checkCompanyExits = require('../../controllers/companies/requests/check-company');

let router = express.Router();

router.post('/:companyName/login/:role',checkCompanyExits, UserLogin);

module.exports = router;