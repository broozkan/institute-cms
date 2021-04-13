const express = require('express')
const router = express.Router()
const Pharmacy = require('../Models/Pharmacy')
const { pharmacyValidation } = require('../validation')


// get pharmacys list
router.get('/list', async (req, res) => {
    const pharmacyList = await Pharmacy.pharmacyModel.find((err, pharmacys) => {
        if (err) return err;

        res.send(pharmacys)
    })
})



// new pharmacy
router.post('/new', async (req, res) => {



    // joi validation
    const validation = pharmacyValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    // new pharmacy
    const newpharmacy = new Pharmacy({
        pharmacy_name: req.body.pharmacy_name,
        pharmacy_address: req.body.pharmacy_address,
        pharmacy_province: req.body.pharmacy_province,
        pharmacy_district: req.body.pharmacy_district,
        pharmacy_phone_number: req.body.pharmacy_phone_number
    })


    const savedpharmacy = newpharmacy.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: newpharmacy
            })
        }
    })

})
// new pharmacy end



module.exports = router