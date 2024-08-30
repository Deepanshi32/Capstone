const express = require('express')
const { getEmployeePassword, createEmployeePassword, updateEmployeePassword, deleteEmployeePassword } = require('../controllers/employeePasswordController')

const router = express.Router()



router.route("/")
    .get(getEmployeePassword)
    .post(createEmployeePassword);

router.route("/:id")
    .patch(updateEmployeePassword)
    .delete(deleteEmployeePassword);

module.exports = router