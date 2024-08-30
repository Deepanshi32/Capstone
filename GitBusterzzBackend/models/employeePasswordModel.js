const mongoose = require('mongoose')

const employeePasswordSchema = mongoose.Schema({
    username: {
        type: String
    },
    Password: {
        type: String
    }
      
})

const EmployeePassword = mongoose.model('EmployeePassword', employeePasswordSchema)

module.exports = { EmployeePassword }