const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminLoginSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }  

})

adminLoginSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}

adminLoginSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)}

const AdminLogin = mongoose.model('adminLoginSchema', adminLoginSchema)

module.exports = { AdminLogin }