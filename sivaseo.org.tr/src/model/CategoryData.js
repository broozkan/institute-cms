import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const getCategoryList = async (categoryId = "", filters,callBack) => {
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'/category/list/'+categoryId,{
        headers: {
            "auth-token":localStorage.getItem('auth-token')
        },
        params:filters
    })
    .then((result) => {
        callBack(result.data)
    })
}

export default getCategoryList