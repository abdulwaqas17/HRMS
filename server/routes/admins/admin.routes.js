let express = require('express');
const createAdmin = require('../../controllers/admins/create-admin');
let router = express.Router();



router.post('/create/admin/:id',createAdmin)

module.exports = router;
