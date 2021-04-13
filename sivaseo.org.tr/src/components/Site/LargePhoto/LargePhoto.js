import React, { Component } from 'react'
import mainPhoto from '../../../images/slider/home-2-1.jpg'


const LargePhoto = () => {


    return (

        <div className="slider-area">
            <div className="large-photo-overlay"></div>
            <div className="slider-warper homev-2">
                <div id="nivoslider-style-1" className="slides">
                    <img src="https://www.eskisehireo.org.tr/dosyalar/image/slider/eskisehir.png" alt="" className="img-fluid w-100 large-photo" title="37. Bölge Sivas Eczacı Odası" />
                </div>
            </div>
        </div>
    )
}


export default LargePhoto