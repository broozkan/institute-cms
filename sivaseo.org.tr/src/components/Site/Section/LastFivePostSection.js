import React, { useEffect, useState } from 'react'
import api from '../../../services/api'
import CommonSpinner from '../Spinner/CommonSpinner'
import PostLink from '../Link/PostLink'


const LastFivePost = () => {

    const [state, setState] = useState({
        last_five_post: [],
        is_last_five_post_loaded: false
    })


    useEffect(() => {
        getLastFivePost()
    }, [])


    const getLastFivePost = async () => {
       
        const lastFivePost = await api.get('/posts/1', {params: {limit: 5}, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            last_five_post: lastFivePost.data.docs,
            is_last_five_post_loaded: true
        })
    }


    let lastFivePostHtml = ""
    if (!state.is_last_five_post_loaded) {
        lastFivePostHtml = <CommonSpinner />
    } else {
        lastFivePostHtml = state.last_five_post.map((item) => {
            return (
                <PostLink post={item} />
            )
        })
    }

    return (
        <div class="side-widget">
            <div class="section-title mb-30">
                <h2> Son Yazılar</h2>
            </div>
            <ul class="widget-list">
                {lastFivePostHtml}
            </ul>
        </div>
    )
}


export default LastFivePost