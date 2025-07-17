let express = require('express');
const getCompanyUsers = require('../../controllers/users/get-users');
const authorizeRoles = require('../../middlewares/authorize-roles.md');
const verifyToken = require('../../middlewares/token-verify.md');
const addUser = require('../../controllers/users/add-user');
const upload = require('../../middlewares/upload.md');
let router = express.Router();


router.get('/admin/users/:id',verifyToken,authorizeRoles("admin"),getCompanyUsers);
router.post('/users/add/:role/:companyID',upload.single("profileImage"),addUser);

module.exports = router;
