const express = require('express')
const router = express.Router()
const Feedback = require('../Models/Feedback')
const { feedbackValidation } = require('../validation')


// delete object for full listing
const deleteObjectForListingAll = async (filters) => {

    // if user select to list all items delete the filter object
    await Object.keys(filters).map((key, index) => {
        if(filters[key] == "*"){
            delete filters[key]
        }
    })
    return filters
}


// get full feedbacks
router.get('/list', async (req, res) => {

    req.query = await deleteObjectForListingAll(req.query)


    const feedbackList = await Feedback.find(req.query,(err, feedbacks) => {
        if (err) return err;

        res.send(feedbacks)
    })
})

// get specific feedback by id
router.get('/list/:feedbackId', async (req, res) => {
   
    await Feedback.findOne({ _id: req.params.feedbackId }, (err, feedbackData) => {
        res.send(feedbackData)
    })
})


// new feedback
router.post('/new', async (req, res) => {

    //req.body = req.body.formData


    // joi validation
    const validation = feedbackValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }




    // new feedback
    const newFeedback = new Feedback({
        feedback_sender_name: req.body.feedback_sender_name,
        feedback_sender_email: req.body.feedback_sender_email,
        feedback_sender_ip_address: req.body.feedback_sender_ip_address,
        feedback_sender_form_id: req.body.feedback_sender_form_id,
        feedback: req.body.feedback
    })


    const savedFeedback = newFeedback.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newFeedback
            })
        }
    })

})
// new feedback end

// update feedback
router.put('/update/:feedbackId', async (req, res) => {


    req.body = req.body.formData

    // joi validation
    const validation = feedbackValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await Feedback.findByIdAndUpdate(
        { _id: req.params.feedbackId },
        {
            feedback_sender_name: req.body.feedback_sender_name,
            feedback_sender_email: req.body.feedback_sender_email,
            feedback_sender_ip_address: req.body.feedback_sender_ip_address,
            feedback_sender_form_id: req.body.feedback_sender_form_id,
            feedback: req.body.feedback
        }

    ,(err, updatedFeedback) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedFeedback
            })
        }
    })

})
// update feedback


// delete feedback
router.delete('/delete/:feedbackId', async (req, res) => {
    await Feedback.deleteOne({ _id: req.params.feedbackId }, (err) => {
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
// delete feedback end



module.exports = router