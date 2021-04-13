const express = require('express')
const router = express.Router()
const Category = require('../Models/ModelCategory')
const { categoryValidation } = require('../validation')

// get full categories
router.get('/list/:page', async (req, res) => {

    const page = req.query.page
    let limit = 50

    let aggregate = Category.CategoryModel.aggregate();

    if (req.query.limit) {
        limit = req.query.limit
        delete req.query.limit
    }


    aggregate.match(req.query)
    const options = { page: req.params.page, limit: limit }

    Category.CategoryModel.aggregatePaginate(aggregate, options, (err, result) => {
        res.send(result)
    })


})

// get specific category by id
router.get('/get/:categoryId', async (req, res) => {
    await Category.CategoryModel.findOne({ _id: req.params.categoryId }, (err, categoryData) => {
        res.send(categoryData)
    })
})


// new category
router.post('/new', async (req, res) => {


    // joi validation
    const validation = categoryValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }


    // check categoryname exist
    let categoryNameExist;
    await Category.CategoryModel.findOne({ category_name: req.body.category_name }, (err, result) => {
        if (result == null) {
            categoryNameExist = null
        } else {
            categoryNameExist = result
        }
    })

    if (categoryNameExist != null) {
        res.send({
            response: false,
            responseData: "Kategori adı zaten mevcut!"
        })
        return false
    }


    // new category
    const newCategory = new Category.CategoryModel({
        category_name: req.body.category_name,
        is_category_main: req.body.is_category_main,
        category_upper_category_id: req.body.category_upper_category_id,
        category_type: req.body.category_type,
        category_post_id: req.body.category_post_id,
        category_external_url: req.body.category_external_url

    })


    const savedCategory = newCategory.save((err) => {
        if (err) {
            res.send({
                response: false,
                responseData: err.message
            })
        } else {
            res.send({
                response: true,
                responseData: newCategory
            })
        }
    })

})
// new category end

// update category
router.put('/update/:categoryId', async (req, res) => {



    // joi validation
    const validation = categoryValidation.validate(req.body)
    if (validation.error) {
        res.send({
            response: false,
            responseData: validation.error.details[0]["message"]
        })
        return false
    }


    // check categoryname exist
    let categoryNameExist;
    await Category.CategoryModel.findOne({ category_name: req.body.category_name, _id: { $ne: req.params.categoryId } }, (err, result) => {
        if (result == null) {
            categoryNameExist = null
        } else {
            categoryNameExist = result
        }
    })

    if (categoryNameExist != null) {
        res.send({
            response: false,
            responseData: "Kategori adı zaten mevcut!"
        })
        return false
    }



    await Category.CategoryModel.findByIdAndUpdate(
        { _id: req.params.categoryId },
        {
            category_name: req.body.category_name,
            is_category_main: req.body.is_category_main,
            category_upper_category_id: req.body.category_upper_category_id,
            category_type: req.body.category_type,
            category_post_id: req.body.category_post_id,
            category_external_url: req.body.category_external_url
        }

        , (err, updatedCategory) => {
            if (err) {
                res.send({
                    response: false,
                    responseData: err
                })
            } else {
                res.send({
                    response: true,
                    responseData: updatedCategory
                })
            }
        })

})
// update category


// delete category
router.delete('/delete/:categoryId', async (req, res) => {
    await Category.CategoryModel.deleteOne({ _id: req.params.categoryId }, (err) => {
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
// delete category end



module.exports = router