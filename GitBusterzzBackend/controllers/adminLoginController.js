
const { Authentication } = require("../models/authenticationModel");

exports.loginAdmin = async (req, res) => {
    const login = {
        username: req.body.username,
        password: req.body.password
    }
    try {
        let user = await Authentication.findOne({
            username: login.username
        });
        //check if user exit
        if (!user) {
            res.status(400).json({
                type: "Not Found",
                msg: "Wrong Login Details"
            })
            return ;
        }
        // let match = await user.compareUserPassword(login.password, user.password);
        
            let token = await user.generateJwtToken({
                user
            }, "secret", {
                expiresIn: 604800
            })
            if (token) {
                res.status(200).json({
                    success: true,
                    token: token,
                    userCredentials: user
                })
            }
        
        if (token){
            // res.status(400).json({
            //     type: "Not Found",
            //     msg: "Wrong Login Details"
            // })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            type: "Something Went Wrong",
            msg: err
        })
    }
}