import React from 'react'


const CategoryLink = (props) => {
    return(
        <li className="category-link">
            <i aria-hidden="true" className="fa fa-tag"></i>
            <a href={"/category/detail/"+props.category._id+"/"+props.category.category_name}> {props.category.category_name}</a>
        </li>
    )
}

export default CategoryLink