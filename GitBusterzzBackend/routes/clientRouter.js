const express = require('express')
const { getAllClient, createClient, getOneClient, updateClient, deleteClient, checkID } = require('../controllers/clientsController');
const { createPolicy } = require('../controllers/policiesController');

const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId;  //A function can be created as follows to check if a string is valid ObjectId or not:
router.param('id', checkID);

router.route("/")
    .get(getAllClient)
    .post(createClient);

router.route("/:id")
    .get(getOneClient)
    .patch(updateClient)
    .delete(deleteClient);

router.route("/:id/policy")
    .post(createPolicy);
    
module.exports = router