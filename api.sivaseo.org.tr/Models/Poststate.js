const mongoose = require('mongoose')


const postStateSchema = mongoose.Schema({
    post_state_name: {
        type: String,
        required: true
    },
    post_state_visibility: {
        type: Boolean,
        required: true
    }
})


module.exports.postStateSchema = postStateSchema
module.exports.PostStateModel = mongoose.model('PostState', postStateSchema)