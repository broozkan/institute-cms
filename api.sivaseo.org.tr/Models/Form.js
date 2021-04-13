const mongoose = require('mongoose')
const FormContent = require('./FormContent')

const formSchema = mongoose.Schema({
    form_name: {
        type: String,
        required: true
    },
    form_content: [FormContent.formContentSchema]
})


module.exports = mongoose.model('Form', formSchema)