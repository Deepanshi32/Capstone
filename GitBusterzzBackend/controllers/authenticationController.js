const { Authentication } = require("../models/authenticationModel")

const getAuthentication = async (req, res) => {
    console.log(req.body.username);
    const getAuthentication = await Authentication.find({ "username": req.body.username })
    
    if (getAuthentication.length === 0) {
        res.send({
            "errMsg":"Incorrect UserName",
            "errCode": "702"
        })
    
    }

    if (req.body.password === getAuthentication[0].password)
        res.send(getAuthentication)
    else {
        res.send({
            "errMsg": "Incorrect Password",
            "errCode": "701"
        })
    }

}

const createAuthentication = async (req, res) => {

    const newAuthentication = await Authentication.create(req.body)

    res.send(newAuthentication)
}



const updateAuthentication = async (req, res) => {

    const updateAuthentication = await Authentication.findByIdAndUpdate(req.params.id, req.body)

    res.send(updateAuthentication)
}


module.exports = {
    getAuthentication,
    createAuthentication,
    updateAuthentication

}