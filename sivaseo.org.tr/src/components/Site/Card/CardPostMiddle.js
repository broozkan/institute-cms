import React from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'

const CardPostMiddle = (props) => {

    return (
        <div class="col-md-12">
            <div class="single-middle-blog">
                <div className="row">
                    <div className="col-md-3">
                        <div class="blog-img img-full">
                            <a href={`${siteUrls.POST_DETAIL_VIEW}/${props.post._id}/?t=${props.post.post_title}`}><img src={process.env.REACT_APP_API_ENDPOINT + "/file/" + props.post.post_categories[0].category_photo} alt="" /></a>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div class="blog-content mt-15">
                            <h5><a href={`${siteUrls.POST_DETAIL_VIEW}/${props.post._id}/?t=${props.post.post_title}`}>{props.post.post_title}</a></h5>
                            <ul class="list-inline mb-20 date">
                                <li><i aria-hidden="true" class="fa fa-clock-o"></i>
                                    <a href="#"> {props.post.post_publish_date}</a>
                                </li>
                            </ul>
                            <p>{props.post.post_alternative_title}</p>
                            <a href={`${siteUrls.POST_DETAIL_VIEW}/${props.post._id}/?t=${props.post.post_title}`} class="btn-one2">Devamını Oku</a>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default CardPostMiddle