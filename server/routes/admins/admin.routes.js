let express = require('express');
const createAdmin = require('../../controllers/admins/create-admin');
const upload = require('../../middlewares/upload.md');
const getCompanyUsers = require('../../controllers/users/get-users');
const authorizeRoles = require('../../middlewares/authorize-roles.md');
const verifyToken = require('../../middlewares/token-verify.md');
let router = express.Router();

router.post('/create/admin/:id',upload.single('profileImage'),createAdmin);
router.get('/admin/get-users/:id',verifyToken,authorizeRoles("admin"),getCompanyUsers);
// router.get('/admin/get-users/:id',getCompanyUsers); for testing

module.exports = router;
