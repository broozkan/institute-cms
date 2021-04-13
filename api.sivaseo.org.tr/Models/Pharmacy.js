const mongoose = require('mongoose')


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

module.exports.pharmacySchema = pharmacySchema
module.exports.pharmacyModel = mongoose.model('Pharmacy', pharmacySchema)
