const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Controller = require('../Controllers/Controller')
const CategoryModel = require('../Models/ModelCategory')
const Category = require('../Classes/ClassCategory')



// get category list
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

        if (req.query['ne_announcement']) {
            req.query['category_type'] = {
                $nin: ['announcement']
            }
            delete req.query["ne_announcement"]
        }

    }

    const aggregate = CategoryModel.categoryModel.aggregate([{
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

    CategoryModel.categoryModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })
})


// get specific category
router.get('/get/:categoryId', async (req, res) => {
    CategoryModel.categoryModel.findById(req.params.categoryId, (err, result) => {
        res.send(result)
    })
})

router.post('/', async (req, res) => {


    const category = new Category(
        req.body.category_name,
        req.body.is_category_main,
        req.body.category_upper_category_id,
        req.body.category_category_id,
        req.body.category_type,
        req.body.category_external_url,
        req.body.category_order_number
    )


    category.save((result) => {
        res.send(result)
    })

})


router.put('/:categoryId', async (req, res) => {


    const category = new Category(
        req.body.category_name,
        req.body.is_category_main,
        req.body.category_upper_category_id,
        req.body.category_category_id,
        req.body.category_type,
        req.body.category_external_url,
        req.body.category_order_number
    )

    await category.setCategoryId(req.params.categoryId)

    await category.update((result) => {
        res.send(result)
    })
})


router.delete('/:categoryId', async (req, res) => {

    const category = new Category

    await category.setCategoryId(req.params.categoryId)

    await category.delete((result) => {
        res.send(result)
    })

})


module.exports = router;
