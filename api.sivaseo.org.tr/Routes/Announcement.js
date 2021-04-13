const express = require('express')
const router = express.Router()
const Announcement = require('../Models/Announcement')
const verifyAuthentication = require('./verifyToken')
const jwt = require('jsonwebtoken')
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: './public/images' })
const fs = require('fs')
const multer = require('multer')
const upload = multer()


// get full announcements
router.get('/list/:page', async (req, res) => {
    


    let aggregate = Announcement.aggregate();
    aggregate.match(req.query)
    const options = { page : req.params.page, limit : 3}

    Announcement.aggregatePaginate(aggregate,options, (err, result) => {
        res.send(result)
    })

    
})

// get specific announcement by id
router.get('/get/:announcementId', async (req, res) => {
    
    await Announcement.findOne({ _id: req.params.announcementId }, (err, announcementData) => {
        res.send(announcementData)
    })
})




// new announcement
router.post('/new', verifyAuthentication, async (req, res) => {


    
    // new announcement
    const newAnnouncement = new Announcement({
        announcement_title: req.body.announcement_title,
        announcement_description: req.body.announcement_description,
        is_announcement_public: req.body.is_announcement_public,
        announcement_user: req.user.userData
    })


    const savedAnnouncement = newAnnouncement.save((err) => {

        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newAnnouncement
            })
        }
    })

})
// new announcement end

// update announcement
router.put('/update/:announcementId', verifyAuthentication, async (req, res) => {


    // update operation
    await Announcement.findByIdAndUpdate(
        { _id: req.params.announcementId },
        {
            announcement_title: req.body.announcement_title,
            announcement_description: req.body.announcement_description,
            is_announcement_public: req.body.is_announcement_public,
            announcement_user: req.user.userData
        }

    ,(err, updatedAnnouncement) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedAnnouncement
            })
        }
    })

})
// update announcement


// delete announcement
router.delete('/delete/:announcementId',async (req, res) => {
    await Announcement.deleteOne({ _id: req.params.announcementId }, (err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: "Başarılı"
            })
        }
    })
})
// delete announcement end



module.exports = router