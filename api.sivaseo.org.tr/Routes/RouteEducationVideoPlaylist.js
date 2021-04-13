const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const EducationVideoPlaylistModel = require('../Models/ModelEducationVideoPlaylist')
const EducationVideoPlaylist = require('../Classes/ClassEducationVideoPlaylist')



// get education video playlist list
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

    }

    const aggregate = EducationVideoPlaylistModel.educationVideoPlaylistModel.aggregate([{
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

    EducationVideoPlaylistModel.educationVideoPlaylistModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific education video playlist
router.get('/get/:educationVideoPlaylistId', async (req, res) => {
    EducationVideoPlaylistModel.educationVideoPlaylistModel.findById(req.params.educationVideoPlaylistId, (err, result) => {
        res.send(result)
    })
})

router.post('/', Controller.verifySiteToken, async (req, res) => {



    const educationVideoPlaylist = new EducationVideoPlaylist(
        req.body.education_video_playlist_name,
        req.body.education_video_playlist_url,
        req.body.is_education_video_playlist_private
    )


    educationVideoPlaylist.save((result) => {
        res.send(result)
    })

})


router.put('/:educationVideoPlaylistId', Controller.verifySiteToken, async (req, res) => {


    const educationVideoPlaylist = new EducationVideoPlaylist(
        req.body.education_video_playlist_name,
        req.body.education_video_playlist_url,
        req.body.is_education_video_playlist_private
    )

    await educationVideoPlaylist.setEducationVideoPlaylistId(req.params.educationVideoPlaylistId)

    await educationVideoPlaylist.update((result) => {
        res.send(result)
    })
})


router.delete('/:educationVideoPlaylistId', async (req, res) => {

    const educationVideoPlaylist = new EducationVideoPlaylist

    await educationVideoPlaylist.setEducationVideoPlaylistId(req.params.educationVideoPlaylistId)

    await educationVideoPlaylist.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
