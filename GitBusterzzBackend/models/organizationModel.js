const mongoose = require('mongoose')

const organizationSchema = mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    employees: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        }
    ],
    clients:{
        name: {
            type: String
        },
    },
    client1:{
        type: String
    },
    client2:{
        type: String
    },
    client3:{
        type: String
    },
    client4:{
        type: String
    },

})

organizationSchema.methods.addEmployee = async function(employee){
    if(this.employees) {
     this.employees = [employee, ...this.employees]
     console.log("in add employee" + organizationSchema)
    } else {
        this.employees = [employee]
    }
    
     
 }

const Organization = mongoose.model('Organization', organizationSchema)

module.exports = { Organization }