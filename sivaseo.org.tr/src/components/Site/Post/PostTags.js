import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import CommonSpinner from '../Spinner/CommonSpinner'
import KeywordTag from '../Keyword/Keyword'
import PostLink from '../Link/PostLink'


const PostTags = () => {

    const [state, setState] = useState({
        post_tags: [],
        is_post_tags_loaded: false
    })


    useEffect(() => {
        getPostTags()
    }, [])


    const getPostTags = async () => {

        const postKeywords = props.post.post_keywords.split(',')


        setState({
            post_tags: postKeywords,
            is_post_tags_loaded: true
        })
    }


    let postKeywordsHtml = ""
    if (!state.is_post_tags_loaded) {
        postKeywordsHtml = <CommonSpinner />
    } else {
        postKeywordsHtml = state.post_tags.map((item) => {
            return (
                <KeywordTag post={item} />
            )
        })
    }

    return(
        <div class="side-widget">
            <div class="section-title mb-30">
                <h2> Son Yazılar</h2>
            </div>
            <ul class="widget-list">
                {postKeywordsHtml}
            </ul>
        </div>
    )
}


export default PostTags