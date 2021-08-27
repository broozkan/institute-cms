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

    try {
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
    } catch (err) {
        // handle the error
        console.log('error: ', err);
    }

}


router.get('/', async (req, res) => {
    const response = await getLastTebPost()
    let tebCategory = await Category.categoryModel.findOne({ category_name: "TEB" }, (err, data) => {
    })



    if (!response) {
        res.send({
            response: false,
            responseData: responseData
        }).status(500)
        return false
    } else {
        // save the post
        console.log(tebCategory);
        tebCategory.category_photo = "teb-duyuru.jpg"
        console.log(tebCategory);

        const newPost = new Post.postModel({
            post_title: response.post_title,
            post_alternative_title: response.post_title,
            post_image: "teb-duyuru.jpg",
            post_content: response.post_content,
            is_post_shown_on_slider: false,
            is_post_open_for_comment: false,
            post_author: "TEB",
            post_keywords: "teb duyuruları",
            post_categories: [
                tebCategory
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