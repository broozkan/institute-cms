import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const getFormList = async (formId = "", {},callBack) => {
    await axios.get(process.env.REACT_APP_API_ENDPOINT+'/form/list/'+formId,{
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

export default getFormList