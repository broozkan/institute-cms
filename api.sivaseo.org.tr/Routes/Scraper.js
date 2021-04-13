const rp = require('request-promise');
const cheerio = require('cheerio');
const express = require('express')
const Joi = require('joi')
const router = express.Router()
const Post = require('../Models/ModelPost');
const Category = require('../Models/ModelCategory')


const scrap = (url, element) => {
    return rp(encodeURI(url))
        .then(function (html) {
            //success!


            const scrapOutput = cheerio(element, html)

            return scrapOutput
        })
        .catch(function (err) {
            return err
        });
}


const getLastTebPost = async () => {

    // get last post from teb.org.tr
    let scrappedWebContent = await scrap('https://www.teb.org.tr/news?news_group=0&firstDate=&endDate=&title=', 'h1')
    const postLink = scrappedWebContent["0"].children["1"].parent.parent.attribs.href
    const postTitle = scrappedWebContent["0"].children["1"].data


    // get content of post
    scrappedWebContent = await scrap(postLink, '.haberPage_M')
    const postContent = scrappedWebContent.html()


    return ({
        post_link: postLink,
        post_title: postTitle,
        post_content: postContent
    })
}


router.get('/', async (req, res) => {
    const response = await getLastTebPost()
    const tebCategoryId = await Category.CategoryModel.findOne({ category_name: "TEB DUYURULARI" }, (err, data) => {
        return data
    })



    if (!response) {
        res.send({
            response: false,
            responseData: responseData
        }).status(500)
        return false
    } else {
        // save the post

        const newPost = new Post({
            post_title: response.post_title,
            post_alternative_title: response.post_title,
            post_image: "teb_logo.png",
            post_content: response.post_content,
            is_post_shown_on_slider: false,
            is_post_open_for_comment: false,
            post_author: "TEB",
            post_keywords: "teb duyuruları",
            post_categories: [
                {
                    _id: tebCategoryId._id,
                    category_name: tebCategoryId.category_name,
                    is_category_main: false,
                    category_type: "category_list",
                    category_upper_category_id: "",
                    is_category_checked: true
                }
            ],
            post_state: "1"
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

    }
})

module.exports = router