const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    comment_post_id: {
        type: String,
        required: true
    },
    comment_sender_name: {
        type: String,
        required: true
    },
    comment_sender_email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    comment_parent_comment_id: {
        type: String,
        default: null,
        required: false
    },
    comment_date: {
        type: Date,
        default: Date.now()
    },
    comment_verification: {
        type: Boolean,
        default: false,
        required: true
    }
})


module.exports = mongoose.model('Comment', commentSchema)