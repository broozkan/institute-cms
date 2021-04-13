import React, { useEffect, useState } from 'react'
import CardPostSmall from '../Card/CardPostSmall'
import CommonSpinner from '../Spinner/CommonSpinner'
import api from '../../../services/api'




const RoomPostsSection = () => {

    const [state, setState] = useState({
        room_posts: [],
        is_room_posts_loaded: false
    })


    useEffect(() => {
        getRoomPosts()
    }, [])

    const getRoomPosts = async () => {
        const roomPosts = await api.get('/posts/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { 'post_categories.category_name': 'ODA' } })

        setState({
            room_posts: roomPosts.data.docs,
            is_room_posts_loaded: true
        })
    }


    let roomPostsHtml = ''
    if (!state.is_room_posts_loaded) {
        roomPostsHtml = <CommonSpinner />
    } else {
        roomPostsHtml = state.room_posts.map((item) => {
            return (
                <CardPostSmall post={item} />
            )
        })
    }

    return(
        <>
            {roomPostsHtml}
        </>
    )

}

export default RoomPostsSection