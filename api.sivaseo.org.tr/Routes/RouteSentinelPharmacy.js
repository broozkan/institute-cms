const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const SentinelPharmacyModel = require('../Models/ModelSentinelPharmacy')
const SentinelPharmacy = require('../Classes/ClassSentinelPharmacy')



// get sentinel pharmacy list
router.get('/:page', async (req, res) => {
    let notEqualObject = {}
    console.log("asfa");
    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

        if (req.query["sentinel_pharmacy_users.user._id"]) {
            req.query["sentinel_pharmacy_users.user._id"] = mongoose.Types.ObjectId(req.query["sentinel_pharmacy_users.user._id"])
        }

    }

    const aggregate = SentinelPharmacyModel.sentinelPharmacyModel.aggregate([{
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

    SentinelPharmacyModel.sentinelPharmacyModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific sentinelPharmacy
router.get('/get/:sentinelPharmacyId', async (req, res) => {
    SentinelPharmacyModel.sentinelPharmacyModel.findById(req.params.sentinelPharmacyId, (err, result) => {
        res.send(result)
    })
})


// get sentinel pharmacies from API
router.post('/save-sentinel-pharmacies', (req, res) => {
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "api.collectapi.com",
        "port": null,
        "path": "/health/dutyPharmacy?ilce=Merkez&il=Sivas",
        "headers": {
            "content-type": "application/json",
            "authorization": process.env.SENTINEL_PHARMACY_API_TOKEN
        }
    };

    let savedPharmacies = new Array()
    var apiReq = http.request(options, function (sentinelPharmaciesData) {
        var chunks = [];

        sentinelPharmaciesData.on("data", function (chunk) {
            chunks.push(chunk);
        });

        sentinelPharmaciesData.on("end", function () {
            var body = JSON.parse(Buffer.concat(chunks).toString());

            body.result.forEach(async (element) => {

                const sentinelPharmacy = new SentinelPharmacy(
                    element.name,
                    111111111111111,
                    element.address,
                    "SİVAS",
                    element.dist,
                    element.phone,
                    element.loc
                )


                await sentinelPharmacy.save((result) => {
                    console.log(result);
                    if (result.status != 400) {
                        savedPharmacies.push(result.responseData)
                    }
                })
            });




        });
    });

    apiReq.end();
    console.log(savedPharmacies);
    res.send(savedPharmacies)

})

router.post('/', Controller.verifySiteToken, async (req, res) => {


    const sentinelPharmacy = new SentinelPharmacy(
        req.body.sentinel_pharmacy_name,
        req.body.sentinel_pharmacy_address,
        req.body.sentinel_pharmacy_province,
        req.body.sentinel_pharmacy_district,
        req.body.sentinel_pharmacy_phone_number,
        req.body.sentinel_pharmacy_location,
        req.body.sentinel_pharmacy_date
    )


    sentinelPharmacy.save((result) => {
        res.send(result)
    })

})


router.put('/:sentinelPharmacyId', async (req, res) => {


    const sentinelPharmacy = new SentinelPharmacy(
        req.body.sentinel_pharmacy_name,
        req.body.sentinel_pharmacy_address,
        req.body.sentinel_pharmacy_province,
        req.body.sentinel_pharmacy_district,
        req.body.sentinel_pharmacy_phone_number,
        req.body.sentinel_pharmacy_location,
        req.body.sentinel_pharmacy_date
    )

    await sentinelPharmacy.setSentinelPharmacyId(req.params.sentinelPharmacyId)

    await sentinelPharmacy.update((result) => {
        res.send(result)
    })
})


router.delete('/:sentinelPharmacyId', async (req, res) => {

    const sentinelPharmacy = new SentinelPharmacy

    await sentinelPharmacy.setSentinelPharmacyId(req.params.sentinelPharmacyId)

    await sentinelPharmacy.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
