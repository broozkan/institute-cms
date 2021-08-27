const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const { userValidation } = require('../validation')
const jwt = require('jsonwebtoken')
const Pharmacy = require('../Models/ModelPharmacy')
const Controller = require('../Controllers/Controller')
const mongoose = require('mongoose')

// get user list
router.get('/:page', async (req, res) => {
    let notEqualObject = {}

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

    }

    const aggregate = User.userModel.aggregate([{
        $match: req.query
    },
    {
        $sort: { _id: 1 }
    }
    ])


    const options = {
        page: req.params.page,
        limit: 50
    }

    User.userModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})

// get specific user by id
router.get('/list/:userId', async (req, res) => {
    await User.userModel.findOne({ _id: req.params.userId }, (err, userData) => {
        res.send(userData)
    })
})


// login
router.post('/login', async (req, res) => {
    let authHeader = req.headers.authorization;


    var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
    const usergln = auth[0]
    const password = auth[1]


    const filters = {
        'user_pharmacy.pharmacy_gln_number': usergln,
        user_password: password
    }

    await User.userModel.find(filters, (err, user) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {

            if (user.length > 0) {
                // success authentication
                // create token
                console.log(user);
                const token = jwt.sign({ userData: user }, process.env.TOKEN_SECRET)
                res.header('auth-token', token)



                res.send({
                    response: true,
                    token: token,
                    responseData: user
                })
            } else {
                res.send({
                    response: false,
                    responseData: "Kullanıcı adı veya parola hatalı!"
                })
            }

        }

    })


})

// new user
router.post('/register', async (req, res) => {

    console.log(req.body);


    //check email exist
    let emailExist;
    await User.userModel.findOne({ user_email: req.body.user_email }, (err, result) => {
        if (result == null) {
            emailExist = null
        } else {
            emailExist = result
        }
    })

    if (emailExist != null) {
        res.send({
            response: false,
            responseData: "E-posta adresi başka bir kullanıcı tarafından kullanılmaktadır!"
        })
        return false
    }


    // new user
    const newUser = new User.userModel({
        user_name: req.body.user_name,
        user_password: req.body.user_password,
        user_email: req.body.user_email,
        user_pharmacy: req.body.user_pharmacy,
        user_redirect_url: req.body.user_redirect_url,
        user_permissions: req.body.user_permissions
    })


    const savedUser = newUser.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newUser
            })
        }
    })

})
// new user end

// update user
router.put('/:userId', async (req, res) => {



    //check email exist
    let emailExist;
    await User.userModel.findOne({ user_email: req.body.user_email, _id: { $ne: req.params.userId } }, (err, result) => {
        if (result == null) {
            emailExist = null
        } else {
            emailExist = result
        }
    })

    if (emailExist != null) {
        res.send({
            response: false,
            responseData: "E-posta adresi başka bir kullanıcı tarafından kullanılmaktadır!"
        })
        return false
    }



    // update user
    await User.userModel.findByIdAndUpdate(
        { _id: req.params.userId },
        {
            user_name: req.body.user_name,
            user_password: req.body.user_password,
            user_email: req.body.user_email,
            user_pharmacy: req.body.user_pharmacy,
            user_redirect_url: req.body.user_redirect_url,
            user_permissions: req.body.user_permissions

        }

        , (err, updatedUser) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedUser
                })
            }
        })

})
// update user


// delete user
router.delete('/:userId', async (req, res) => {
    await User.userModel.deleteOne({ _id: req.params.userId }, (err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: "Başarılı"
            })
        }
    })

})
// delete user end



module.exports = router