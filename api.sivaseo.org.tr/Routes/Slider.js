const express = require('express')
const router = express.Router()
const Slider = require('../Models/Slider')
const { sliderValidation } = require('../validation')


// get full sliders
router.get('/list', async (req, res) => {
    const sliderList = await Slider.find((err, sliders) => {
        if (err) return err;

        res.send(sliders)
    })
})

// get specific slider by id
router.get('/list/:sliderId', async (req, res) => {
    await Slider.findOne({ _id: req.params.sliderId }, (err, sliderData) => {
        res.send(sliderData)
    })
})


// new slider
router.post('/new', async (req, res) => {

    req.body = req.body.formData


    // joi validation
    const validation = sliderValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }




    // new slider
    const newSlider = new Slider({
        slider_name: req.body.slider_name
    })


    const savedSlider = newSlider.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newSlider
            })
        }
    })

})
// new slider end

// update slider
router.put('/update/:sliderId', async (req, res) => {


    req.body = req.body.formData

    // joi validation
    const validation = sliderValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await Slider.findByIdAndUpdate(
        { _id: req.params.sliderId },
        {
            slider_name: req.body.slider_name
        }

    ,(err, updatedSlider) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedSlider
            })
        }
    })

})
// update slider


// delete slider
router.delete('/delete/:sliderId', async (req, res) => {
    await Slider.deleteOne({ _id: req.params.sliderId }, (err) => {
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
// delete slider end



module.exports = router