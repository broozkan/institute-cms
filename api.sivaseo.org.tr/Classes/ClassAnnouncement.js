const AnnouncementModel = require('../Models/ModelAnnouncement')


class Announcement {
    constructor(
        announcement_title,
        announcement_description,
        is_announcement_public,
        announcement_user,
        announcement_category,
    ) {
        this.announcement_id = ''
        this.announcement_title = announcement_title
        this.announcement_description = announcement_description
        this.is_announcement_public = is_announcement_public
        this.announcement_category = announcement_category
        this.announcement_user = announcement_user

    }

    setAnnouncementId(announcement_id) {
        this.announcement_id = announcement_id
    }


    async save(cb) {
        const savedAnnouncement = new AnnouncementModel.announcementModel(this)

        await savedAnnouncement.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedAnnouncement,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.announcement_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await AnnouncementModel.announcementModel.findByIdAndUpdate(
            { _id: this.announcement_id },
            this

            , (err, updatedAnnouncement) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedAnnouncement
                    })
                }
            })
    }


    async delete(cb) {
        await AnnouncementModel.announcementModel.deleteOne({ _id: this.announcement_id }, (err) => {
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

module.exports = Announcement