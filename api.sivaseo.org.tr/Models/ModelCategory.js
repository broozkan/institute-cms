const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")


const categorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: true
    },
    category_photo: {
        type: String,
        required: false
    },
    is_category_main: {
        type: Boolean,
        required: true
    },
    category_upper_category_id: {
        type: String,
        required: false
    },
    category_post_id: {
        type: String,
        required: false
    },
    category_type: {
        type: String,
        required: true
    },
    category_external_url: {
        type: String,
        required: false
    },
    category_post_id: {
        type: String,
        required: false
    },
    category_order_number: {
        type: Number,
        required: true
    }
})

categorySchema.plugin(aggregatePaginate);

module.exports.categorySchema = categorySchema
module.exports.categoryModel = mongoose.model('Category', categorySchema)
