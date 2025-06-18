let express = require('express');
const UserLogin = require('../../controllers/auth/user-login');

let router = express.Router();

router.post('/auth/login/:role',UserLogin);

module.exports = router;