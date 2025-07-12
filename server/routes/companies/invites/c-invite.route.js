let express = require('express');
const sendInvite = require('../../../controllers/companies/invites/send-invite-company');
const verifyToken = require('../../../middlewares/token-verify.md');
const authorizeRoles = require('../../../middlewares/authorize-roles.md');
const inviteCompany = require('../../../controllers/companies/invites/invite-company');
let router = express.Router();


router.post('/company-invite/:id',verifyToken ,authorizeRoles('owner') ,sendInvite);
router.post('/company-invite',verifyToken ,authorizeRoles('owner') ,inviteCompany);


module.exports = router;