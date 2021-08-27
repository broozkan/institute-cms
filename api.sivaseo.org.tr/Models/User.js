const mongoose = require('mongoose')
const Permission = require('./Permission')
const Pharmacy = require('./ModelPharmacy')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")


const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_password: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: false
    },
    user_pharmacy: Pharmacy.pharmacySchema,
    user_redirect_url: {
        type: String,
        required: false,
        default: '/user/dashboard'
    },
    user_permissions: {
        type: Array,
        required: false
    },
})

userSchema.plugin(aggregatePaginate);

module.exports.userSchema = userSchema
module.exports.userModel = mongoose.model('User', userSchema)