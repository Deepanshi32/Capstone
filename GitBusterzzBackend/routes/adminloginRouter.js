const express = require('express');
const { loginAdmin } = require('../controllers/adminLoginController');



const router = express.Router()

router.route("/adminlogin")
    .post(loginAdmin)

module.exports = router