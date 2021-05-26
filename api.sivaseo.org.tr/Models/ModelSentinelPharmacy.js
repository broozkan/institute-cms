const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")


const sentinelPharmacySchema = mongoose.Schema({
    sentinel_pharmacy_name: {
        type: String,
        required: true
    },
    sentinel_pharmacy_address: {
        type: String,
        required: true
    },
    sentinel_pharmacy_province: {
        type: String,
        required: true
    },
    sentinel_pharmacy_district: {
        type: String,
        required: true
    },
    sentinel_pharmacy_phone_number: {
        type: String,
        required: false
    },
    sentinel_pharmacy_location: {
        type: String,
        required: true
    },
    sentinel_pharmacy_date: {
        type: Date,
        default: Date.now
    }
})

sentinelPharmacySchema.index({ sentinel_pharmacy_name: 'text' })
sentinelPharmacySchema.plugin(aggregatePaginate);

module.exports.sentinelPharmacyModel = mongoose.model('SentinelPharmacy', sentinelPharmacySchema)
module.exports.sentinelPharmacySchema = sentinelPharmacySchema
