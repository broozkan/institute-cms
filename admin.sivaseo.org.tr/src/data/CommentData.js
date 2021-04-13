import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const getCommentList = async (commentId = "", filters,callBack) => {
    
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'/comment/list/'+commentId,{
        headers: {
            "auth-token":localStorage.getItem('auth-token')
        },
        params:filters
    })
    .then((result) => {
        callBack(result.data)
    })
    .catch((err) => {
        window.location.href="/user/login/"
        return false
    })
}

export default getCommentList