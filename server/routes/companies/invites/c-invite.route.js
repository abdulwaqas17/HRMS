let express = require('express');
const sendInvite = require('../../../controllers/companies/invites/invite-company');
const verifyToken = require('../../../middlewares/token-verify.md');
const authorizeRoles = require('../../../middlewares/authorize-roles.md');
let router = express.Router();


router.post('/company-invite',verifyToken ,authorizeRoles('owner') ,sendInvite)


module.exports = router;