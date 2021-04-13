const mongoose = require('mongoose')


const shortcutSchema = mongoose.Schema({
    shortcut_name: {
        type: String,
        required: true
    },
    shortcut_model_name: {
        type: String,
        required: true
    },
    shortcut_url: {
        type: String,
        required: true
    },
    shortcut_image: {
        type: String,
        required: false
    },
    is_shortcut_open_in_new_tab: {
        type: Boolean,
        required: true
    }
})


module.exports = mongoose.model('Shortcut', shortcutSchema)