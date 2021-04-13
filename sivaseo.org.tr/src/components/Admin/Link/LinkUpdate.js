import React from 'react'
import {Link} from 'react-router-dom'

const LinkUpdatePost = (props) => {

    return(
        <a href={"/admin/"+props.model_name+"/update/"+props._id}> <span className="fa fa-edit"></span> Düzenle</a>
    )

}

export default LinkUpdatePost