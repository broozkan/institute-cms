const { date } = require('joi')
const mongoose = require('mongoose')


const sentinelpharmacySchema = mongoose.Schema({
    sentinelpharmacy_name: {
        type: String,
        required: true
    },
    sentinelpharmacy_address: {
        type: String,
        required: true
    },
    sentinelpharmacy_province: {
        type: String,
        required: true
    },
    sentinelpharmacy_district: {
        type: String,
        required: true
    },
    sentinelpharmacy_phone_number: {
        type: String,
        required: false
    },
    sentinelpharmacy_location: {
        type: String,
        required: true
    },
    sentinelpharmacy_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Sentinelpharmacy', sentinelpharmacySchema)
