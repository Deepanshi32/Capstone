const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    name: {
        type: String
    },
    logo: {
        type: String
    },
    policies: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy'
        }
    ]

})

clientSchema.methods.addPolicy = async function(policy){
   if(this.policies) {
    this.policies = [policy, ...this.policies]
   } else {
       this.policies = [policy]
   }
   
    
}

const Client = mongoose.model('Client', clientSchema)

module.exports = { Client }