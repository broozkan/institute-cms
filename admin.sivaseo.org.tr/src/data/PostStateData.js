import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const getPostStateList = async (postStateId = "",callBack) => {
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'/post-state/list/'+postStateId,{
        headers: {
            "auth-token":localStorage.getItem('auth-token')
        }
    })
    .then((result) => {
        callBack(result.data)
    })
    .catch((err) => {
        
        window.location.href="/user/login/"
        return false
    })
}

export default getPostStateList