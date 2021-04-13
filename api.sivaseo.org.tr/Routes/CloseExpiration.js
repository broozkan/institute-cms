const express = require('express')
const router = express.Router()
const CloseExpirationMedicine = require('../Models/CloseExpirationMedicine')
const { closeExpirationMedicineValidation } = require('../validation')
const verifyAuthentication = require('./verifyToken')
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: './public/images' })
const fs = require('fs')
const multer = require('multer')
const upload = multer()

// get full closeExpirationMedicines
router.get('/list/:page', async (req, res) => {

    const page = req.query.page


    let aggregate = CloseExpirationMedicine.aggregate();
    aggregate.match(req.query)
    const options = { page : req.params.page, limit : 3}

    CloseExpirationMedicine.aggregatePaginate(aggregate,options, (err, result) => {
        res.send(result)
    })

    /*const formList = await CloseExpirationMedicine.find(req.query,{},{skip:1, limit: 3},(err, closeExpirationMedicines) => {
        if (err) return err;

        res.send(closeExpirationMedicines)
    })*/
})

// get specific form by id
router.get('/get/:closeExpirationMedicineId', async (req, res) => {

    await CloseExpirationMedicine.findOne({ _id: req.params.closeExpirationMedicineId }, (err, result) => {
        res.send(result)
    })
})


// new form
router.post('/new', [verifyAuthentication, MultipartyMiddleware], async (req, res) => {

    if(req.files.file){
        const tmp_path = req.files.file.path
        const target_path = './public/images/' + req.files.file.name
    
        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
                return
            }
    
            fs.unlink(tmp_path, () => {
                if (err) {
                    res.send({
                        response: false,
                        responseData: err
                    })
                    return
                }
    
            })
    
        })
    }
    


    req.body = JSON.parse(req.body.data)


    // joi validation
    const validation = closeExpirationMedicineValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }

        console.log(req.body);
    //req.body.close_expiration_medicine_expiration_date = await parseIso(req.body.close_expiration_medicine_expiration_date)

    // new form
    const newCloseExpirationMedicine = new CloseExpirationMedicine({
        close_expiration_medicine_name: req.body.close_expiration_medicine_name,
        close_expiration_medicine_piece: req.body.close_expiration_medicine_piece,
        close_expiration_medicine_mf_piece: req.body.close_expiration_medicine_mf_piece,
        close_expiration_medicine_stock_piece: req.body.close_expiration_medicine_stock_piece,
        close_expiration_medicine_price: req.body.close_expiration_medicine_price,
        close_expiration_medicine_expiration_date: req.body.close_expiration_medicine_expiration_date,
        close_expiration_medicine_image: req.body.close_expiration_medicine_image,
        close_expiration_medicine_user: req.user.userData
    })


    const savedCloseExpirationMedicine = newCloseExpirationMedicine.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newCloseExpirationMedicine
            })
        }
    })

})
// new form end

// update form
router.put('/update/:closeExpirationMedicineId', [verifyAuthentication, MultipartyMiddleware], async (req, res) => {


    if(req.files.file){
        const tmp_path = req.files.file.path
        const target_path = './public/images/' + req.files.file.name
    
        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
                return
            }
    
            fs.unlink(tmp_path, () => {
                if (err) {
                    res.send({
                        response: false,
                        responseData: err
                    })
                    return
                }
    
            })
    
        })
    }
   

    req.body = JSON.parse(req.body.data)

    // joi validation
    const validation = closeExpirationMedicineValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await CloseExpirationMedicine.findByIdAndUpdate(
        { _id: req.params.closeExpirationMedicineId },
        {
            close_expiration_medicine_name: req.body.close_expiration_medicine_name,
            close_expiration_medicine_piece: req.body.close_expiration_medicine_piece,
            close_expiration_medicine_mf_piece: req.body.close_expiration_medicine_mf_piece,
            close_expiration_medicine_stock_piece: req.body.close_expiration_medicine_stock_piece,
            close_expiration_medicine_price: req.body.close_expiration_medicine_price,
            close_expiration_medicine_expiration_date: req.body.close_expiration_medicine_expiration_date,
            close_expiration_medicine_image: req.body.close_expiration_medicine_image,
            close_expiration_medicine_user: req.user.userData
        }

        , (err, updatedCloseExpirationMedicine) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedCloseExpirationMedicine
                })
            }
        })

})
// update form


// delete form
router.delete('/delete/:closeExpirationMedicineId', async (req, res) => {
    await CloseExpirationMedicine.deleteOne({ _id: req.params.closeExpirationMedicineId }, (err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: "Başarılı"
            })
        }
    })

})
// delete form end



module.exports = router