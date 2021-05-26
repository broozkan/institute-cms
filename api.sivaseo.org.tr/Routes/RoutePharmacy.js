const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const PharmacyModel = require('../Models/ModelPharmacy')
const Pharmacy = require('../Classes/ClassPharmacy')



// get pharmacy list
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

        if (req.query["pharmacy_users.user._id"]) {
            req.query["pharmacy_users.user._id"] = mongoose.Types.ObjectId(req.query["pharmacy_users.user._id"])
        }

    }

    const aggregate = PharmacyModel.pharmacyModel.aggregate([{
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

    PharmacyModel.pharmacyModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific pharmacy
router.get('/get/:pharmacyId', async (req, res) => {
    PharmacyModel.pharmacyModel.findById(req.params.pharmacyId, (err, result) => {
        res.send(result)
    })
})

router.post('/', Controller.verifySiteToken, async (req, res) => {


    const pharmacy = new Pharmacy(
        req.body.pharmacy_name,
        req.body.pharmacy_address,
        req.body.pharmacy_province,
        req.body.pharmacy_district,
        req.body.pharmacy_phone_number
    )


    pharmacy.save((result) => {
        res.send(result)
    })

})


router.put('/:pharmacyId', async (req, res) => {


    const pharmacy = new Pharmacy(
        req.body.pharmacy_name,
        req.body.pharmacy_address,
        req.body.pharmacy_province,
        req.body.pharmacy_district,
        req.body.pharmacy_phone_number
    )

    await pharmacy.setPharmacyId(req.params.pharmacyId)

    await pharmacy.update((result) => {
        res.send(result)
    })
})


router.delete('/:pharmacyId', async (req, res) => {

    const pharmacy = new Pharmacy

    await pharmacy.setPharmacyId(req.params.pharmacyId)

    await pharmacy.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
