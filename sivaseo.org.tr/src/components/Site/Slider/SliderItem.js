import React from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'


const sliderItem = (props) => {


    return (
        <div className={'carousel-item ' + props.props.is_active}>
            <Link to={`${siteUrls.POST_DETAIL_VIEW}/${props.props._id}`}>
                <img className="d-block w-100" src={process.env.REACT_APP_API_ENDPOINT + "/file/" + props.props.post_image} alt={props.props.post_title} />
            </Link>
            <span className="badge badge-info carousel-badge-category"><span className="fa fa-tag"></span> ODAMIZDAN</span>
            <span className="badge badge-info carousel-badge-date"><span className="fa fa-calendar"></span> 09.11.2020</span>
            <div className="carousel-caption d-md-block">
                <h5><Link to={`${siteUrls.POST_DETAIL_VIEW}/${props.props._id}`}>{props.props.post_title}</Link></h5>
            </div>
        </div>
    )

}

export default sliderItem