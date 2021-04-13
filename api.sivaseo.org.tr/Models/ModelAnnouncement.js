const mongoose = require('mongoose')
const User = require('./User')
const Category = require('./ModelCategory')

var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const announcementSchema = mongoose.Schema({
    announcement_title: {
        type: String,
        required: true
    },
    announcement_description: {
        type: String,
        required: true
    },
    is_announcement_public: {
        type: Boolean,
        required: true
    },
    announcement_user: User.userSchema,
    announcement_category: Category.categorySchema,
    announcement_publish_date: {
        type: Date,
        default: Date.now
    }
})

announcementSchema.plugin(aggregatePaginate);


module.exports.announcementModel = mongoose.model('Announcement', announcementSchema)
module.exports.announcementSchema = announcementSchema