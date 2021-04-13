const mongoose = require('mongoose')
const User = require('./User')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const closeExpirationSchema = mongoose.Schema({
    close_expiration_name: {
        type: String,
        required: true
    },
    close_expiration_piece: {
        type: Number,
        required: true
    },
    close_expiration_mf_piece: {
        type: Number,
        required: true
    },
    close_expiration_stock_piece: {
        type: Number,
        required: true
    },
    close_expiration_price: {
        type: String,
        required: true
    },
    close_expiration_expiration_date: {
        type: Date,
        required: true
    },
    close_expiration_image: {
        type: String,
        required: false
    },
    close_expiration_user: [User.userSchema]
})


closeExpirationSchema.plugin(aggregatePaginate);

module.exports.closeExpirationModel = mongoose.model('CloseExpiration', closeExpirationSchema)
module.exports.closeExpirationSchema = closeExpirationSchema