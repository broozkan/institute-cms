import React, { useEffect, useState } from 'react'
import CardPostSmall from '../Card/CardPostSmall'
import CommonSpinner from '../Spinner/CommonSpinner'
import api from '../../../services/api'




const TebPostsSection = () => {

    const [state, setState] = useState({
        teb_posts: [],
        is_teb_posts_loaded: false
    })


    useEffect(() => {
        getTebPosts()
    }, [])

    const getTebPosts = async () => {
        const tebPosts = await api.get('/posts/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { 'post_categories.category_name': 'TEB' } })

        setState({
            teb_posts: tebPosts.data.docs,
            is_teb_posts_loaded: true
        })
    }


    let tebPostsHtml = ''
    if (!state.is_teb_posts_loaded) {
        tebPostsHtml = <CommonSpinner />
    } else {
        tebPostsHtml = state.teb_posts.map((item) => {
            return (
                <CardPostSmall post={item} />
            )
        })
    }

    return(
        <>
            {tebPostsHtml}
        </>
    )

}

export default TebPostsSection