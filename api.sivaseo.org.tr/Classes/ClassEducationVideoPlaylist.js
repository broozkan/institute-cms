const EducationVideoPlaylistModel = require('../Models/ModelEducationVideoPlaylist')


class EducationVideoPlaylist {
    constructor(
        education_video_playlist_name,
        education_video_playlist_url,
        is_education_video_playlist_private
    ) {
        this.education_video_playlist_id = ''
        this.education_video_playlist_name = education_video_playlist_name
        this.education_video_playlist_url = education_video_playlist_url
        this.is_education_video_playlist_private = is_education_video_playlist_private

    }

    setEducationVideoPlaylistId(education_video_playlist_id) {
        this.education_video_playlist_id = education_video_playlist_id
    }


    async save(cb) {
        const savedEducationVideoPlaylist = new EducationVideoPlaylistModel.educationVideoPlaylistModel(this)

        await savedEducationVideoPlaylist.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedEducationVideoPlaylist,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.education_video_playlist_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await EducationVideoPlaylistModel.educationVideoPlaylistModel.findByIdAndUpdate(
            { _id: this.education_video_playlist_id },
            this

            , (err, updatedEducationVideoPlaylist) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedEducationVideoPlaylist
                    })
                }
            })
    }


    async delete(cb) {
        await EducationVideoPlaylistModel.educationVideoPlaylistModel.deleteOne({ _id: this.education_video_playlist_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = EducationVideoPlaylist