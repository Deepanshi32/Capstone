const mongoose = require('mongoose')

const policySchema = mongoose.Schema({
    PolicyName: {
        type: String
    },
    ClientName: {
        type: String
    },
    Age: {
        type: Number,
    },
    Residance: {
        type: String,
        enum: ['Rural','Urban'],
        default: 'Rural'
    },
    Dependants: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 0
    },
    Premium: {
        type: Number
    },
    Description: {
        type: String
    }
})

const Policy = mongoose.model('Policy', policySchema)

module.exports = { Policy }