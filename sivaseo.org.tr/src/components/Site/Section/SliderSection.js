import React, { useEffect, useState } from 'react'
import SliderItem from '../Slider/SliderItem'
import api from '../../../services/api'

const SliderSection = () => {

    const [state, setState] = useState({
        sliderItems: [],
        is_slider_items_loaded: false
    })


    useEffect(() => {
        getSliderItems()
    }, [])

    const getSliderItems = async () => {
        const sliderItems = await api.get('/posts/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { is_post_shown_on_slider: true } })

        setState({
            sliderItems: sliderItems.data.docs,
            is_slider_items_loaded: true
        })

    }

    let sliderItemsHtml = ''
    let subSliderItemsJsx = []
    if (state.is_slider_items_loaded) {
        sliderItemsHtml = state.sliderItems.map((item, index) => {
            if (index == 1) {
                item.is_active = "active"
            }

            /*subSliderItemsJsx.push(
                <img width="75" className={item.is_active} src={`${process.env.REACT_APP_API_ENDPOINT}/file/${state.sliderItems[index].post_image}`} />
            )*/
            return (
                <SliderItem props={item} />
            )
        })
    }




    return (

        <div className="slider-container container mt-5">
            <div className="col-lg-12">
                <div className="section-title2 text-center">
                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">

                        <div className="carousel-inner">
                            {sliderItemsHtml}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row sub-slider" >
                {subSliderItemsJsx}
            </div>
        </div>
    )
}


export default SliderSection