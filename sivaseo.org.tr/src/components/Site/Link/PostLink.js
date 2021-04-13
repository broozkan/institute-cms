import React from 'react'
import {Link} from 'react-router-dom'

const PostLink = (props) => {



    return(
	    <li> <span className="fa fa-chevron-right"></span> 
            <a href={"/post/detail/" + props.post._id+"?t="+props.post.post_title}>{props.post.post_title}</a>
        </li>
    )
}

export default PostLink