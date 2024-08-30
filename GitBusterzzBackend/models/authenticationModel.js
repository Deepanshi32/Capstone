const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authenticationSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }  

})

authenticationSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}

authenticationSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)}

const Authentication = mongoose.model('Authentication', authenticationSchema)

module.exports = { Authentication }