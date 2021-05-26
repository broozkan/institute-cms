const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const PostModel = require('../Models/ModelPost')
const Post = require('../Classes/ClassPost')
const multiparty = require('connect-multiparty')
const uploadDir = './public/images'
const MultipartyMiddleware = multiparty({ keepExtensions: true, uploadDir: uploadDir })
const fs = require('fs')
const path = require('path');


// get post list
router.get('/:page', async (req, res) => {

    let pipeline = []

    if (req.query) {
        req.query = Controller.deleteEmptyFilters(req.query)

        pipeline = [
            {
                $match: req.query,
            },
            {
                $sort: { post_order_number: 1 }
            }
        ]

        if (req.query._id) {
            req.query._id = mongoose.Types.ObjectId(req.query._id)
        }

        if (req.query["_id"]) {
            req.query["_id"] = mongoose.Types.ObjectId(req.query["_id"])
        }


        if (req.query["is_post_shown_on_slider"]) {
            req.query["is_post_shown_on_slider"] = req.query["is_post_shown_on_slider"] == true
        }

        if (req.query.search) {
            pipeline = [
                {
                    $match: {
                        "$text": { "$search": req.query.search }
                    }
                },
                {
                    $sort: { post_order_number: 1 }
                }
            ]
        }

    }
    const aggregate = PostModel.postModel.aggregate(pipeline)

    const options = {
        page: req.params.page,
        limit: 10
    }

    PostModel.postModel.aggregatePaginate(aggregate, options, (err, result) => {
        console.log(err)
        res.send(result)
    })
})


// get specific post
router.get('/get/:postId', async (req, res) => {
    PostModel.postModel.findById(req.params.postId, (err, result) => {
        res.send(result)
    })
})


router.patch('/:postId', async (req, res) => {

    await PostModel.postModel.findByIdAndUpdate({ _id: req.params.postId }, req.body, (err, updatedPost) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message,
                status: 400
            })
        } else {
            broadcast(req.app.locals.clients, "PRODUCT_STOCK_CHANGED");

            res.send({
                response: true,
                responseData: updatedPost
            })
        }
    });
})


router.post('/', [MultipartyMiddleware, Controller.verifySiteToken], async (req, res) => {

    req.body = JSON.parse(req.body.data)


    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.post_image = req.files.file
    }



    const post = new Post(
        req.body.post_title,
        req.body.post_alternative_title,
        req.body.post_image,
        req.body.post_content,
        req.body.is_post_shown_on_slider,
        req.body.is_post_open_for_comment,
        req.user,
        req.body.post_keywords,
        req.body.post_categories,
        req.body.post_state
    )

    console.log(post);
    post.save((result) => {
        console.log(result);
        res.send(result)
    })

})


router.put('/:postId', MultipartyMiddleware, async (req, res) => {


    req.body = JSON.parse(req.body.data)

    if (req.files.file) {
        const tmp_path = req.files.file.path
        const target_path = path.join(uploadDir, req.files.file.name)


        fs.rename(tmp_path, target_path, (err) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: "Dosya yüklenemedi"
                })
                res.end()

                return false
            } else {
                fs.unlink(tmp_path, (err) => {

                })

            }
        })

        req.body.post_image = req.files.file
    }


    const post = new Post(
        req.body.post_title,
        req.body.post_alternative_title,
        req.body.post_image,
        req.body.post_content,
        req.body.is_post_shown_on_slider,
        req.body.is_post_open_for_comment,
        req.body.post_author,
        req.body.post_keywords,
        req.body.post_categories,
        req.body.post_state
    )

    await post.setPostId(req.params.postId)

    await post.update((result) => {
        res.send(result)
    })
})


router.delete('/:postId', async (req, res) => {

    const post = new Post

    await post.setPostId(req.params.postId)

    await post.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
