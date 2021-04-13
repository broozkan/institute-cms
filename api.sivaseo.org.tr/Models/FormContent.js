const mongoose = require('mongoose')


const formContentSchema = mongoose.Schema({
    form_content_element_label : {
        type : String,
        required : true
    },
    form_content_element_type_name : {
        type : String,
        required : true
    },
    is_form_content_required : {
        type : Boolean,
        required : true
    },
    form_content_additional_classes: {
        type: String,
        required: false
    },
    form_content_list_element_options: {
        type: Array,
        required: false
    }
    
})

module.exports.formContentSchema = formContentSchema
module.exports.formContentModel = mongoose.model('FormContent', formContentSchema)
