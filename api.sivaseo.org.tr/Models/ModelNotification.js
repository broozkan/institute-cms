const mongoose = require('mongoose')
const User = require('./User')

var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const notificationSchema = mongoose.Schema({
    notification_title: {
        type: String,
        required: true
    },
    notification: {
        type: String,
        required: true
    },
    notification_users: [User.userSchema],
    notification_publish_date: {
        type: Date,
        default: Date.now
    }
})

notificationSchema.plugin(aggregatePaginate);


module.exports.notificationModel = mongoose.model('Notification', notificationSchema)
module.exports.notificationSchema = notificationSchema