let express = require('express');
const addEmployee = require('../../controllers/employees/add-employee');
let router = express.Router();



router.post('/add/employee/:id',addEmployee)

module.exports = router;
