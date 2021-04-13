import React from 'react'
import SentinelPharmacies from '../../../components/Site/Modal/ModalSentinelPharmacies'
import LargePhoto from '../../../components/Site/LargePhoto/LargePhoto'
import SliderSection from '../../../components/Site/Section/SliderSection'
import ShortcutSquare from '../../../components/Site/Section/SquareShortcutsSection'
import TebPostsSection from '../../../components/Site/Section/TebPostsSection'
import RoomPostsSection from '../../../components/Site/Section/RoomPostsSection'
import Footer from '../../../components/Site/Footer/Footer'
import SocialMediaLinksSection from '../../../components/Site/Section/SocialMediaLinksSection'

const Home = () => {


    return (
        <>
            <LargePhoto />
            <div className="slider-overlay"></div>

            <div className="section-area ptb-70 homev-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row ">
                                <div className="col-lg-12 order-lg-2 order-1">
                                    <div className="row">
                                        <SliderSection />
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-2  order-3 order-md-1 mt-xs-5">
                                            <div className="row">
                                                <div className="col-lg-12 col-6">
                                                    <SentinelPharmacies />
                                                </div>
                                                <div className="col-lg-12 px-0">
                                                    <a href="https://docs.google.com/spreadsheets/d/1LFFfAacrdU-_xNeFGgrmRKMkwNtIOzgqxW3D6R7zMzw/edit#gid=972394514" target="_blank" className="btn btn-lg btn-danger w-100" style={{ lineHeight: '50px', fontSize: '16px' }}>ASKERİYE SIRA LİSTESİ</a>
                                                </div>
                                                <div className="col-lg-12 px-0 mt-3">
                                                    <div className="card">
                                                        <div className="card-body text-center">
                                                            <img src="https://www.teb.org.tr//uploads/bh/41/dier/icon_eczanem_nerede_kirmizi2.jpg" className="w-75" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 mt-3 mb-xs-2 px-0">
                                                    <SocialMediaLinksSection />
                                                </div>
                                                <div className="col-lg-12 mt-3 mb-xs-2 px-0">
                                                    <ShortcutSquare />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 mt-xs-4 order-1 order-md-2">
                                            <p className="h2 large-title">ODA Duyuruları</p>
                                            <RoomPostsSection />
                                        </div>
                                        <div className="col-lg-4 order-2 order-md-3">
                                            <p className="h2 large-title">TEB Duyuruları</p>
                                            <TebPostsSection />
                                        </div>
                                        <div className="col-lg-2  order-4 order-md-4">
                                            <img src="https://i0.wp.com/www.sivaseo.org.tr/wp-content/uploads/2017/03/tebartı.jpg?fit=300%2C567" className="img-fluid" />

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}


export default Home