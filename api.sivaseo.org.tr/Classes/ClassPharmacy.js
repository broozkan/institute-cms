const PharmacyModel = require('../Models/ModelPharmacy')


class Pharmacy {
    constructor(
        pharmacy_name,
        pharmacy_address,
        pharmacy_province,
        pharmacy_district,
        pharmacy_phone_number,
    ) {
        this.pharmacy_id = ''
        this.pharmacy_name = pharmacy_name
        this.pharmacy_address = pharmacy_address
        this.pharmacy_province = pharmacy_province
        this.pharmacy_district = pharmacy_district
        this.pharmacy_phone_number = pharmacy_phone_number

    }

    setPharmacyId(pharmacy_id) {
        this.pharmacy_id = pharmacy_id
    }


    async save(cb) {
        const savedPharmacy = new PharmacyModel.pharmacyModel(this)

        await savedPharmacy.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedPharmacy,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.pharmacy_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await PharmacyModel.pharmacyModel.findByIdAndUpdate(
            { _id: this.pharmacy_id },
            this

            , (err, updatedPharmacy) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedPharmacy
                    })
                }
            })
    }


    async delete(cb) {
        await PharmacyModel.pharmacyModel.deleteOne({ _id: this.pharmacy_id }, (err) => {
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

module.exports = Pharmacy