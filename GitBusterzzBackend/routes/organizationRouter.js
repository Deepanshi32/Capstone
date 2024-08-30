const express = require('express')
const { getOrganizations, createOrganization, updateOrganization, getOneOrganization,deleteOrganization, checkID } = require('../controllers/organizationsController')
const { createEmployee } = require('../controllers/employeesController');

const router = express.Router();

router.route("/")
    .get(getOrganizations)
    .post(createOrganization);

router
    .route('/:id')
    .get(getOneOrganization)
    .patch(updateOrganization)
    .delete(deleteOrganization);

router.route("/:id/employee")
    .post(createEmployee);

module.exports = router