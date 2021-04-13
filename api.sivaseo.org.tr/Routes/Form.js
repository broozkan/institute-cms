const express = require('express')
const router = express.Router()
const Form = require('../Models/Form')
const { formValidation } = require('../validation')


// delete object for full listing
const deleteObjectForAllListing = async (filters) => {

    // if user select to list all items delete the filter object
    await Object.keys(filters).map((key, index) => {
        if(filters[key] == "*"){
            delete filters[key]
        }
    })
    return filters
}


// get full forms
router.get('/list', async (req, res) => {

    req.query = await deleteObjectForAllListing(req.query)


    const formList = await Form.find(req.query,(err, forms) => {
        if (err) return err;

        res.send(forms)
    })
})

// get specific form by id
router.get('/list/:formId', async (req, res) => {
   
    await Form.findOne({ _id: req.params.formId }, (err, formData) => {
        res.send(formData)
    })
})


// new form
router.post('/new', async (req, res) => {

    req.body = req.body.formData


    // joi validation
    const validation = formValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }




    // new form
    const newForm = new Form({
        form_name: req.body.form_name,
        form_content: req.body.form_content
    })


    const savedForm = newForm.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newForm
            })
        }
    })

})
// new form end

// update form
router.put('/update/:formId', async (req, res) => {


    req.body = req.body.formData

    // joi validation
    const validation = formValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await Form.findByIdAndUpdate(
        { _id: req.params.formId },
        {
            form_name: req.body.form_name,
            form_content: req.body.form_content
        }

    ,(err, updatedForm) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedForm
            })
        }
    })

})
// update form


// delete form
router.delete('/delete/:formId', async (req, res) => {
    await Form.deleteOne({ _id: req.params.formId }, (err) => {
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