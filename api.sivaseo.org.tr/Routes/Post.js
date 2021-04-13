const express = require('express')
const router = express.Router()
const Post = require('../Models/ModelPost')
const { postValidation } = require('../validation')
const verifyAuthentication = require('./verifyToken')
const jwt = require('jsonwebtoken')
const deleteObjectForAllListing = require('./Filter')
const multiparty = require('connect-multiparty')
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: './public/images' })
const fs = require('fs')
const multer = require('multer')
const upload = multer()
const path = require('path')

// get full posts
router.get('/list/:page', async (req, res) => {
    
    const page = req.query.page
    let recordLimit = 50

    if(req.query.limit){
        recordLimit = parseInt(req.query.limit)
        delete req.query.limit
    }

    if(req.query.is_post_shown_on_slider == 'true'){
        req.query.is_post_shown_on_slider = true
    }else{
        req.query.is_post_shown_on_slider = false
    }
    


    let aggregate = Post.aggregate();
    aggregate.match(req.query)
    const options = { 
        page : req.params.page, 
        limit : recordLimit,
        sort: { post_publish_date: "descending"}
    }

    Post.aggregatePaginate(aggregate,options, (err, result) => {
        res.send(result)
    })

    
})

// get specific post by id
router.get('/get/:postId', async (req, res) => {
    
    await Post.findOne({ _id: req.params.postId }, (err, postData) => {
        res.send(postData)
    })
})




// new post
router.post('/new', [verifyAuthentication, MultipartyMiddleware], async (req, res) => {

    console.log(req.files);
    const tmp_path = req.files.file.path
    const target_path =  './public/images/' + req.files.file.name

    fs.rename(tmp_path, target_path, (err) => {
        if(err){
            res.send({
                response: false,
                responseData: err.message
            })
            return
        }

        fs.unlink(tmp_path, () => {
            if(err){
                res.send({
                    response: false,
                    responseData: err.message
                })
                return
            }

        })

    })

    req.body = JSON.parse(req.body.data)



    // joi validation
    const validation = postValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }

    
    // new post
    const newPost = new Post({
        post_title: req.body.post_title,
        post_alternative_title: req.body.post_alternative_title,
        post_image: req.files.file.name,
        post_content: req.body.post_content,
        is_post_shown_on_slider: req.body.is_post_shown_on_slider,
        is_post_open_for_comment: req.body.is_post_open_for_comment,
        post_author: req.user.userData[0].user_username,
        post_keywords: req.body.post_keywords,
        post_categories: req.body.post_categories,
        post_state: req.body.post_state
    })


    const savedPost = newPost.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newPost
            })
        }
    })

})
// new post end

// update post
router.put('/update/:postId', [verifyAuthentication, MultipartyMiddleware], async (req, res) => {


    const tmp_path = req.files.file.path
    const target_path =  './public/images/' + req.files.file.name

    fs.rename(tmp_path, target_path, (err) => {
        if(err){
            res.send({
                response: false,
                responseData: err.message
            })
            return
        }

        fs.unlink(tmp_path, () => {
            if(err){
                res.send({
                    response: false,
                    responseData: err.message
                })
                return
            }

        })

    })

    req.body = JSON.parse(req.body.data)

    // joi validation
    const validation = postValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }


    // update operation
    await Post.findByIdAndUpdate(
        { _id: req.params.postId },
        {
            post_title: req.body.post_title,
            post_alternative_title: req.body.post_alternative_title,
            post_image: req.files.file.name,
            post_content: req.body.post_content,
            is_post_shown_on_slider: req.body.is_post_shown_on_slider,
            is_post_open_for_comment: req.body.is_post_open_for_comment,
            post_author: req.user.userData[0].user_username,
            post_keywords: req.body.post_keywords,
            post_categories: req.body.post_categories,
            post_state: req.body.post_state
        }

    ,(err, updatedPost) => {
        if (err) {
            res.send({
                response: false,
                responseData: err
            })
        } else {
            res.send({
                response: true,
                responseData: updatedPost
            })
        }
    })

})
// update post


// delete post
router.delete('/delete/:postId',async (req, res) => {
    await Post.deleteOne({ _id: req.params.postId }, (err) => {
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
// delete post end



module.exports = router