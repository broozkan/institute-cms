import React, { Component } from 'react'
import image0 from '../../../images/slider/home-2-1.jpg'
import image1 from '../../../images/slider/home-2-2.jpg'
import OwlCarousel from "react-owl-carousel";


const LargePhoto = () => {

    // render activities
    let activitiesHtml = []
    let carouselHtml = ''
    for (let index = 0; index < 2; index++) {
        if (index == 0) {
            activitiesHtml.push(
                <div className="slider-area">
                    <div className="large-photo-overlay"></div>
                    <div className="slider-warper homev-2">
                        <div id="nivoslider-style-1" className="slides">
                            <img src={image0} alt="" className="img-fluid w-100" title="37. Bölge Sivas Eczacı Odası" />
                        </div>
                    </div>
                </div>
            )
        } else {
            activitiesHtml.push(
                <div className="slider-area">
                    <div className="large-photo-overlay"></div>
                    <div className="slider-warper homev-2">
                        <div id="nivoslider-style-1" className="slides">
                            <img src={image1} alt="" className="img-fluid w-100" title="37. Bölge Sivas Eczacı Odası" />
                        </div>
                    </div>
                </div>
            )
        }

    }



    const responsive = {
        0: {
            items: 1,
        }
    }
    carouselHtml = (
        <OwlCarousel className="owl-theme"
            loop={true}
            margin={0}
            nav={false}
            dots={false}
            autoplay={true}
            autoplayTimeout={6000}
            items={1}
            responsive={responsive}
        >
            {activitiesHtml}
        </OwlCarousel>
    )


    // render activities

    return (

        <>
            {carouselHtml}
        </>
    )
}


export default LargePhoto