const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const AnnouncementModel = require('../Models/ModelAnnouncement')
const Announcement = require('../Classes/ClassAnnouncement')



// get announcement list
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
        if (req.query["announcement_category._id"]) {
            req.query["announcement_category._id"] = mongoose.Types.ObjectId(req.query["announcement_category._id"])
        }
    }

    const aggregate = AnnouncementModel.announcementModel.aggregate([{
        $match: req.query
    },
    {
        $sort: { _id: 1 }
    }
    ])

    console.log([{
        $match: req.query
    },
    {
        $sort: { _id: 1 }
    }
    ]);

    const options = {
        page: req.params.page,
        limit: 50
    }

    AnnouncementModel.announcementModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific announcement
router.get('/get/:announcementId', async (req, res) => {
    AnnouncementModel.announcementModel.findById(req.params.announcementId, (err, result) => {
        res.send(result)
    })
})

router.post('/', Controller.verifySiteToken, async (req, res) => {


    const announcement = new Announcement(
        req.body.announcement_title,
        req.body.announcement_description,
        req.body.is_announcement_public,
        req.user,
        req.body.announcement_category
    )


    announcement.save((result) => {
        res.send(result)
    })

})


router.put('/:announcementId', async (req, res) => {


    const announcement = new Announcement(
        req.body.announcement_title,
        req.body.announcement_description,
        req.body.is_announcement_public,
        req.user,
        req.body.announcement_category
    )

    await announcement.setAnnouncementId(req.params.announcementId)

    await announcement.update((result) => {
        res.send(result)
    })
})


router.delete('/:announcementId', async (req, res) => {

    const announcement = new Announcement

    await announcement.setAnnouncementId(req.params.announcementId)

    await announcement.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
