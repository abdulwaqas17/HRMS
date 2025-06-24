let express = require('express');
const createAdmin = require('../../controllers/admins/create-admin');
const upload = require('../../middlewares/upload.md');
let router = express.Router();

router.post('/create/admin/:id',upload.single('profileImage'),createAdmin)

module.exports = router;
