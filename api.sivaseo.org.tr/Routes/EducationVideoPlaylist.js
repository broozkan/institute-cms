const express = require('express')
const router = express.Router()
const EducationVideoPlaylist = require('../Models/EducationVideoPlaylist')
const { educationVideoPlaylistValidation } = require('../validation')
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: './public/images' })
const fs = require('fs')
const multer = require('multer')
const upload = multer()



// get full educationVideoPlaylists
router.get('/list', async (req, res) => {


    const formList = await EducationVideoPlaylist.find(req.query,(err, educationVideoPlaylists) => {
        if (err) return err;

        res.send(educationVideoPlaylists)
    })
})

// get specific form by id
router.get('/list/:educationVideoPlaylistId', async (req, res) => {
   
    await EducationVideoPlaylist.findOne({ _id: req.params.educationVideoPlaylistId }, (err, formData) => {
        res.send(formData)
    })
})


// new form
router.post('/new', async (req, res) => {

    req.body = req.body.formData


    // joi validation
    const validation = educationVideoPlaylistValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }




    // new form
    const newEducationVideoPlaylist = new EducationVideoPlaylist({
        education_video_playlist_name: req.body.education_video_playlist_name,
        education_video_playlist_url: req.body.education_video_playlist_url,
        is_education_video_playlist_private: req.body.is_education_video_playlist_private
    })


    const savedEducationVideoPlaylist = newEducationVideoPlaylist.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newEducationVideoPlaylist
            })
        }
    })

})
// new form end

// update form
router.put('/update/:educationVideoPlaylistId', async (req, res) => {



    req.body = req.body.formData

    // joi validation
    const validation = educationVideoPlaylistValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await EducationVideoPlaylist.findByIdAndUpdate(
        { _id: req.params.educationVideoPlaylistId },
        {
            education_video_playlist_name: req.body.education_video_playlist_name,
            education_video_playlist_url: req.body.education_video_playlist_url,
            is_education_video_playlist_private: req.body.is_education_video_playlist_private
        }

    ,(err, updatedEducationVideoPlaylist) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedEducationVideoPlaylist
            })
        }
    })

})
// update form


// delete form
router.delete('/delete/:educationVideoPlaylistId', async (req, res) => {
    await EducationVideoPlaylist.deleteOne({ _id: req.params.educationVideoPlaylistId }, (err) => {
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
// delete form end



module.exports = router