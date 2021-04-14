import React from 'react'
import { siteUrls } from '../../../lib/Site/siteUrls';


const CardPostSmall = (props) => {

    const date = new Date(props.post.post_publish_date)

    const postPublishDate = date.getDate() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear();


    return (
        <div className="single-blog hvr-grow">
            <div className="row">
                <div className="col-lg-3 col-3 single-blog-image-container">
                    <div className="blog-img img-fluid">
                        <a href={`${siteUrls.POST_DETAIL_VIEW}/${props.post._id}/?t=${props.post.post_title}`}>
                            <img src={process.env.REACT_APP_API_ENDPOINT + "/file/" + props.post.post_image} alt="" className="single-blog-img" />
                        </a>
                    </div>
                </div>
                <div className="col-lg-9 col-9">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="blog-content ">

                                <div className="single-blog-post-title">
                                    <a href={`${siteUrls.POST_DETAIL_VIEW}/${props.post._id}/?t=${props.post.post_title}`} alt={props.post.post_title}>
                                        {props.post.post_title}
                                    </a>
                                </div>


                                <ul className="list-inline date mt-2">
                                    <li>
                                        <i aria-hidden="true" className="fa fa-user"></i>
                                        <a href="#"> {props.post.post_categories[0]["category_name"]} </a>
                                        <br></br>
                                        <i aria-hidden="true" className="fa fa-clock-o"></i>
                                        <a href="#"> {postPublishDate}</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default CardPostSmall