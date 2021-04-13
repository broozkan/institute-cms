const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const CloseExpirationModel = require('../Models/ModelCloseExpiration')
const CloseExpiration = require('../Classes/ClassCloseExpiration')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get close expiration list
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

    }

    const aggregate = CloseExpirationModel.closeExpirationModel.aggregate([{
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

    CloseExpirationModel.closeExpirationModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific close expiration
router.get('/get/:closeExpirationId', async (req, res) => {
    CloseExpirationModel.closeExpirationModel.findById(req.params.closeExpirationId, (err, result) => {
        res.send(result)
    })
})

router.post('/', [MultipartyMiddleware, Controller.verifySiteToken], async (req, res) => {

    req.body = JSON.parse(req.body.data)


    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.close_expiration_image = req.files.file
    }


    const closeExpiration = new CloseExpiration(
        req.body.close_expiration_name,
        req.body.close_expiration_piece,
        req.body.close_expiration_mf_piece,
        req.body.close_expiration_stock_piece,
        req.body.close_expiration_price,
        req.body.close_expiration_expiration_date,
        req.body.close_expiration_image,
        req.user
    )


    closeExpiration.save((result) => {
        res.send(result)
    })

})


router.put('/:closeExpirationId', [MultipartyMiddleware, Controller.verifySiteToken], async (req, res) => {


    req.body = JSON.parse(req.body.data)


    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.close_expiration_image = req.files.file
    }


    const closeExpiration = new CloseExpiration(
        req.body.close_expiration_name,
        req.body.close_expiration_piece,
        req.body.close_expiration_mf_piece,
        req.body.close_expiration_stock_piece,
        req.body.close_expiration_price,
        req.body.close_expiration_expiration_date,
        req.body.close_expiration_image,
        req.user
    )

    await closeExpiration.setCloseExpirationId(req.params.closeExpirationId)

    await closeExpiration.update((result) => {
        res.send(result)
    })
})


router.delete('/:closeExpirationId', async (req, res) => {

    const closeExpiration = new CloseExpiration

    await closeExpiration.setCloseExpirationId(req.params.closeExpirationId)

    await closeExpiration.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
