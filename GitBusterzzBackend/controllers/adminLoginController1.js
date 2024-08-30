const { Authentication } = require("../models/authenticationModel");


const loginAdmin = async (req, res) => {
    console.log('req', req.body)
    const login = {
        username: req.body.username,
        password: req.body.password
    }
    const valid = false;
    try {
        
        let admin = await Authentication.findOne({
            username: login.username,
            password: login.password
        });
        console.log(admin)
        console.log('junk')
        if (admin === null) {
            // res.status(400).json({
            //     type: "Not Found",
            //     msg: "Wrong Login Details"
            // })
            res.status(200).json({
                success: false,
                token: null,
                adminDetails: login.username
            })
            valid = false;      
        }
        else{
            valid = true;
        }
        //let match = await admin.compareUserPassword(login.password, admin.password);
        if (true) {
            let token = await admin.generateJwtToken({

                admin
            }, "secret", {
                expiresIn: 604800
            })
            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    adminDetails: admin.username
                })
            }
            console.log('empty token')
        } else {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
        }
    } catch (err) {
        console.log(err)
        // res.status(500).json({
        //     type: "Something Went Wrong",
        //     msg: err
        // })
        res.status(200).json({
            success: false,
            token: null,
            adminDetails: admin.username
        })
    }
}

module.exports = {
    loginAdmin

}