const PostModel = require('../Models/ModelPost')


class Post {
    constructor(
        post_title,
        post_alternative_title,
        post_image,
        post_content,
        is_post_shown_on_slider,
        is_post_open_for_comment,
        post_author,
        post_keywords,
        post_categories,
        post_state
    ) {
        this.post_id = ''
        this.post_title = post_title
        this.post_alternative_title = post_alternative_title
        this.post_image = post_image
        this.post_content = post_content
        this.is_post_shown_on_slider = is_post_shown_on_slider
        this.is_post_open_for_comment = is_post_open_for_comment
        this.post_author = post_author
        this.post_keywords = post_keywords
        this.post_categories = post_categories
        this.post_state = post_state

    }

    setPostId(post_id) {
        this.post_id = post_id
    }


    async save(cb) {
        const savedPost = new PostModel.postModel(this)

        await savedPost.save((err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err.message,
                    status: 400
                })
            } else {
                cb({
                    response: true,
                    responseData: savedPost,
                    status: 201
                })
            }
        })
    }


    async update(cb) {

        if (this.post_id == '') {
            cb({
                response: false,
                responseData: "Kayıt bulunamadı"
            })
            return false
        }


        await PostModel.postModel.findByIdAndUpdate(
            { _id: this.post_id },
            this
            , (err, updatedPost) => {
                if (err) {
                    cb({
                        response: false,
                        responseData: err.message
                    })
                } else {
                    cb({
                        response: true,
                        responseData: updatedPost
                    })
                }
            })
    }



    async delete(cb) {
        await PostModel.postModel.deleteOne({ _id: this.post_id }, (err) => {
            if (err) {
                cb({
                    response: false,
                    responseData: err
                })
            } else {
                cb({
                    response: true,
                    responseData: "Başarılı"
                })
            }
        })
    }
}

module.exports = Post