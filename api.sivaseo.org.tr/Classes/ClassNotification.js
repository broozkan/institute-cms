const NotificationModel = require('../Models/ModelNotification')


class Notification {
    constructor(
        notification_title,
        notification,
        notification_users
    ) {
        this.notification_id = ''
        this.notification_title = notification_title
        this.notification = notification
        this.notification_users = notification_users

    }

    setNotificationId(notification_id) {
        this.notification_id = notification_id
    }


    async save(cb) {
        const savedNotification = new NotificationModel.notificationModel(this)

        await savedNotification.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedNotification,
                    status: 400
                })
            }
        })
    }


    async update(cb) {

        if (this.notification_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }

        await NotificationModel.notificationModel.findByIdAndUpdate(
            { _id: this.notification_id },
            this

            , (err, updatedNotification) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedNotification
                    })
                }
            })
    }


    async delete(cb) {
        await NotificationModel.notificationModel.deleteOne({ _id: this.notification_id }, (err) => {
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

module.exports = Notification