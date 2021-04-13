import React from 'react'


const Keyword = (props) => {
    return(
        <li>
            <i aria-hidden="true" className="fa fa-tag"></i>
            <a href="#"> {props.keyword}</a>
        </li>
    )
}

export default Keyword