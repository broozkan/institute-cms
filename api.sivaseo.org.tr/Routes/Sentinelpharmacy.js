const express = require('express')
const router = express.Router()
const Sentinelpharmacy = require('../Models/Sentinelpharmacy')
var http = require("https");


// get pharmacys list
router.get('/list', async (req, res) => {
   
    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999)

    // get todays sentinel pharmacies
    const pharmacyList = await Sentinelpharmacy.find( {
        sentinelpharmacy_date: {
            $gte: start,
            $lte: end
          }
    } ,(err, pharmacys) => {
        if (err) return err;

        res.send(pharmacys)
    })
})

// get sentinel pharmacies from API
router.get('/save-sentinel-pharmacies', (req, res) => {
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

        sentinelPharmaciesData.on("end",  function () {
            var body = JSON.parse(Buffer.concat(chunks).toString());
            body.result.map(async (item) => {
                const savedSentinelPharmacy = await newSentinelPharmacy(item)
                savedPharmacies.push(item)
                console.log(item);
            })
            
        });
    });

    apiReq.end();

    res.send(savedPharmacies)

})


// new sentinel pharmacy
const newSentinelPharmacy = async (sentinelPharmacyData) => {
    const newSentinelPharmacyData = new Sentinelpharmacy({
        sentinelpharmacy_name:sentinelPharmacyData.name,
        sentinelpharmacy_district:sentinelPharmacyData.dist,
        sentinelpharmacy_province:"Sivas",
        sentinelpharmacy_address:sentinelPharmacyData.address,
        sentinelpharmacy_location:sentinelPharmacyData.loc,
        sentinelpharmacy_phone_number:sentinelPharmacyData.phone
    })


    const savedSentinelPharmacy = await newSentinelPharmacyData.save((err, savedItem) => {
        
        if (err) {
            return {
                response: false,
                responseData: err.message
            }
        }else{
            return {
                response: true,
                responseData: savedSentinelPharmacy
            }
        }
    })

}
// new sentinel pharmacy end



module.exports = router