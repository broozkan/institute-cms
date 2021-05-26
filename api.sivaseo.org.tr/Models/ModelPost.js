const mongoose = require('mongoose')
const Category = require('./ModelCategory')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const postSchema = mongoose.Schema({
    post_title: {
        type: String,
        required: true
    },
    post_alternative_title: {
        type: String,
        required: false
    },
    post_image: {
        type: Object,
        required: true
    },
    post_content: {
        type: String,
        required: true
    },
    is_post_shown_on_slider: {
        type: Boolean,
        required: true
    },
    is_post_open_for_comment: {
        type: Boolean,
        required: true
    },
    post_author: {
        type: String,
        required: true
    },
    post_keywords: {
        type: String,
        required: false
    },
    post_categories: [Category.categorySchema],
    post_state: {
        type: String,
        required: true
    },
    post_publish_date: {
        type: Date,
        default: Date.now
    },
    post_modified_date: {
        type: Date,
        default: Date.now
    },

})

postSchema.index({ post_content: 'text' })
postSchema.plugin(aggregatePaginate);


module.exports.postSchema = postSchema
module.exports.postModel = mongoose.model('Post', postSchema)