const express = require('express')
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getOneEmployee,checkID } = require('../controllers/employeesController')

const router = express.Router()

router.param('id', checkID);

router.route("/")
    .get(getAllEmployees)
    .post(createEmployee)



router.route("/:id")
     .patch(updateEmployee)
     .delete(deleteEmployee)
     .get(getOneEmployee)

router.route('/:id/:empCompany')
     .delete(deleteEmployee);

module.exports = router