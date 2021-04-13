const mongoose = require('mongoose')
var aggregatePaginate = require("mongoose-aggregate-paginate-v2")

const educationVideoPlaylistSchema = mongoose.Schema({
    education_video_playlist_name: {
        type: String,
        required: true
    },
    education_video_playlist_url: {
        type: String,
        required: true
    },
    is_education_video_playlist_private: {
        type: Boolean,
        required: true
    }
})
educationVideoPlaylistSchema.plugin(aggregatePaginate);


module.exports.educationVideoPlaylistModel = mongoose.model('EducationVideoPlaylist', educationVideoPlaylistSchema)
module.exports.educationVideoPlaylistSchema = educationVideoPlaylistSchema