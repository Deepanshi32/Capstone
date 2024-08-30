const express = require('express')
const { getPolicies, createPolicy, getOnePolicy, updatePolicy, deletePolicy, checkID } = require('../controllers/policiesController')

const router = express.Router()

router.param('id', checkID);

router.route("/")
    .get(getPolicies)
    .post(createPolicy);

router.route('/:id')
    .get(getOnePolicy)
    .patch(updatePolicy)
    .delete(deletePolicy);

router.route('/:id/:clientName')
    .delete(deletePolicy);


module.exports = router