const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const NotificationModel = require('../Models/ModelNotification')
const Notification = require('../Classes/ClassNotification')



// get notification list
router.get('/:page', async (req, res) => {
    let notEqualObject = {}

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }

        if (req.query["notification_users.user._id"]) {
            req.query["notification_users.user._id"] = mongoose.Types.ObjectId(req.query["notification_users.user._id"])
        }

    }

    const aggregate = NotificationModel.notificationModel.aggregate([{
        $match: req.query
    },
    {
        $sort: { _id: 1 }
    }
    ])

    const options = {
        page: req.params.page,
        limit: 50
    }

    NotificationModel.notificationModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific notification
router.get('/get/:notificationId', async (req, res) => {
    NotificationModel.notificationModel.findById(req.params.notificationId, (err, result) => {
        res.send(result)
    })
})

router.post('/', Controller.verifySiteToken, async (req, res) => {


    const notification = new Notification(
        req.body.notification_title,
        req.body.notification,
        req.body.notification_users
    )


    notification.save((result) => {
        res.send(result)
    })

})


router.put('/:notificationId', async (req, res) => {


    const notification = new Notification(
        req.body.notification_title,
        req.body.notification,
        req.body.notification_users
    )

    await notification.setNotificationId(req.params.notificationId)

    await notification.update((result) => {
        res.send(result)
    })
})


router.delete('/:notificationId', async (req, res) => {

    const notification = new Notification

    await notification.setNotificationId(req.params.notificationId)

    await notification.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
