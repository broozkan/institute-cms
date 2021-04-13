const express = require('express')
const router = express.Router()
const Comment = require('../Models/Comment')
const { commentValidation } = require('../validation')
const deleteObjectForAllListing = require('./Filter')



// get full comments
router.get('/list', async (req, res) => {

    req.query = await deleteObjectForAllListing(req.query)

    const commentList = await Comment.find(req.query,(err, comments) => {
        if (err) return err;

        res.send(comments)
    }).sort({comment_date:-1}).limit(5)
})

// get specific comment by id
router.get('/list/:commentId', async (req, res) => {
   
    await Comment.findOne({ _id: req.params.commentId }, (err, commentData) => {
        res.send(commentData)
    })
})


// new comment
router.post('/new', async (req, res) => {

    req.body = req.body.formData

    // joi validation
    const validation = commentValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }


    

    // new comment
    const newComment = new Comment({
        comment_post_id: req.body.comment_post_id,
        comment_sender_name: req.body.comment_sender_name,
        comment_sender_email: req.body.comment_sender_email,
        comment: req.body.comment,
        comment_parent_comment_id: req.body.comment_parent_comment_id
    })


    const savedComment = newComment.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newComment
            })
        }
    })

})
// new comment end

// update comment
router.put('/update/:commentId', async (req, res) => {


    req.body = req.body.formData

    // joi validation
    const validation = commentValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }



    await Comment.findByIdAndUpdate(
        { _id: req.params.commentId },
        {
            comment_post_id: req.body.comment_post_id,
            comment_sender_name: req.body.comment_sender_name,
            comment_sender_email: req.body.comment_sender_email,
            comment: req.body.comment,
            comment_parent_comment_id: req.body.comment_parent_comment_id
        }

    ,(err, updatedComment) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedComment
            })
        }
    })

})
// update comment


// delete comment
router.delete('/delete/:commentId', async (req, res) => {
    await Comment.deleteOne({ _id: req.params.commentId }, (err) => {
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
// delete comment end



module.exports = router