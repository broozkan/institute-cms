const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const pharmacySchema = mongoose.Schema({
    pharmacy_name: {
        type: String,
        required: true
    },
    pharmacy_address: {
        type: String,
        required: true
    },
    pharmacy_province: {
        type: String,
        required: true
    },
    pharmacy_district: {
        type: String,
        required: true
    },
    pharmacy_phone_number: {
        type: String,
        required: true
    }
})

pharmacySchema.plugin(aggregatePaginate);


module.exports.pharmacyModel = mongoose.model('Pharmacy', pharmacySchema)
module.exports.pharmacySchema = pharmacySchema
