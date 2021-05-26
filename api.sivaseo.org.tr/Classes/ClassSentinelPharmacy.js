const SentinelPharmacyModel = require('../Models/ModelSentinelPharmacy')


class SentinelPharmacy {
    constructor(
        sentinel_pharmacy_name,
        sentinel_pharmacy_address,
        sentinel_pharmacy_province,
        sentinel_pharmacy_district,
        sentinel_pharmacy_phone_number,
        sentinel_pharmacy_location,
        sentinel_pharmacy_date
    ) {
        this.sentinel_pharmacy_id = ''
        this.sentinel_pharmacy_name = sentinel_pharmacy_name
        this.sentinel_pharmacy_address = sentinel_pharmacy_address
        this.sentinel_pharmacy_province = sentinel_pharmacy_province
        this.sentinel_pharmacy_district = sentinel_pharmacy_district
        this.sentinel_pharmacy_phone_number = sentinel_pharmacy_phone_number
        this.sentinel_pharmacy_location = sentinel_pharmacy_location
        this.sentinel_pharmacy_date = sentinel_pharmacy_date

    }

    setSentinelPharmacyId(sentinel_pharmacy_id) {
        this.sentinel_pharmacy_id = sentinel_pharmacy_id
    }


    async save(cb) {
        const savedSentinelPharmacy = new SentinelPharmacyModel.sentinelPharmacyModel(this)

        await savedSentinelPharmacy.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedSentinelPharmacy,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.sentinel_pharmacy_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await SentinelPharmacyModel.sentinelPharmacyModel.findByIdAndUpdate(
            { _id: this.sentinel_pharmacy_id },
            this

            , (err, updatedSentinelPharmacy) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message,
                        status: 400
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedSentinelPharmacy,
                        status: 200
                    })
                }
            })
    }


    async delete(cb) {
        await SentinelPharmacyModel.sentinelPharmacyModel.deleteOne({ _id: this.sentinel_pharmacy_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = SentinelPharmacy