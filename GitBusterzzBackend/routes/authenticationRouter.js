//post route  req, res
// req --> username, password
// res --> username, password, role
// username, password will be hardcoded.



// Update the password

const express = require('express');
const { loginAdmin } = require('../controllers/adminLoginController');

const { getAuthentication, createAuthentication, updateAuthentication } = require('../controllers/authenticationController')

const router = express.Router()

router.route("/")
    .get(getAuthentication)
    .post(createAuthentication)
    

router.route("/:id")
    .patch(updateAuthentication)
    
router.route("/adminlogin")
    .post(loginAdmin)

module.exports = router