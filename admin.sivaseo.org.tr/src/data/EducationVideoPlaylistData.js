import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const getEducationVideoPlaylistList = async (educationVideoId = "",callBack) => {
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'/education-video-playlist/list/'+educationVideoId,{
        headers: {
            "auth-token":localStorage.getItem('auth-token')
        }
    })
    .then((result) => {
        callBack(result.data)
    })
    .catch((err) => {
        /*window.location.href="/user/login/"
        return false*/
    })
}

export default getEducationVideoPlaylistList