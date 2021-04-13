import React, {Component} from 'react'
import banner from '../../../images/bg/web-ataturk-banner.jpg'

const headerBanner = () => {


    return(
        <div className="row">
            <div className="col-lg-12 text-center mt-3">
                <img src={banner} id="top-image" className="img-fluid" alt="" />
            </div>
        </div>
    )
    
}


export default headerBanner