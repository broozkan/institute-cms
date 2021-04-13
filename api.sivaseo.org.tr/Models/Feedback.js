const { required } = require('joi')
const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    feedback_sender_name: {
        type: String,
        required: true
    },
    feedback_sender_email: {
        type: String,
        required: true
    },
    feedback_sender_ip_address: {
        type: String,
        required: true
    },
    feedback_sender_form_id: {
        type: String,
        required: true
    },
    feedback:{
        type: String,
        required: true
    },
    feedback_date: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Feedback', feedbackSchema)