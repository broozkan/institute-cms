import React from 'react'
import logo from '../../../images/logo/sivaseo_logo.jpeg'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'

const CardEducationVideoPlaylist = (props) => {
    return (
        <div class="single-box img-full mb-30 fix youtube-playlist-card">
            <div class="image-box custom-col-5">
                <img src={process.env.REACT_APP_API_ENDPOINT + "/file/egitim.jpg"} alt="" />
                <a href="#"><i class="fa fa-video-camera" aria-hidden="true"></i></a>
            </div>
            <div class="text-content custom-col-5 pl-15 my-2">
                <h6><Link to={`${siteUrls.EDUCATION_VIDEO_PLAYLIST_DETAIL_VIEW}/${props.education_video_playlist._id}`}>{props.education_video_playlist.education_video_playlist_name}</Link></h6>

                <hr className="m-0"></hr>
                <Link className="youtube-playlist-card-bottom-text" to={`${siteUrls.EDUCATION_VIDEO_PLAYLIST_DETAIL_VIEW}/${props.education_video_playlist._id}`}>İçeriğe Git <span className="fa fa-chevron-right"></span></Link>

            </div>
        </div>
    )
}

export default CardEducationVideoPlaylist