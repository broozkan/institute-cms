const mongoose = require('mongoose')

const sliderSchema = mongoose.Schema({
    slider_name: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Slider', sliderSchema)