import React from 'react'
import SentinelPharmacies from '../../../components/Site/Modal/ModalSentinelPharmacies'
import LargePhoto from '../../../components/Site/LargePhoto/LargePhoto'
import SliderSection from '../../../components/Site/Section/SliderSection'
import ShortcutSquare from '../../../components/Site/Section/SquareShortcutsSection'
import TebPostsSection from '../../../components/Site/Section/TebPostsSection'
import RoomPostsSection from '../../../components/Site/Section/RoomPostsSection'
import Footer from '../../../components/Site/Footer/Footer'
import SocialMediaLinksSection from '../../../components/Site/Section/SocialMediaLinksSection'
import { siteUrls } from '../../../lib/Site/siteUrls'

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
                                                    <a href="https://docs.google.com/spreadsheets/d/13jimsuOxcvkRxrAccfqBpA39qewNpa4wIZyUBwwihu4/edit#gid=2028176229" target="_blank" className="btn btn-lg btn-danger w-100 " style={{ lineHeight: '50px', fontSize: '16px' }}>ASKERİYE SIRA LİSTESİ</a>
                                                </div>
                                                <div className="col-lg-12 px-0">
                                                    <a href="https://www.sivaseo.org.tr/nobetdemo/tumlistenp.php" target="_blank" className="btn btn-lg btn-danger w-100 mt-3" style={{ lineHeight: '50px', fontSize: '16px' }}>TÜM NÖBET LİSTESİ</a>
                                                </div>
                                                <div className="col-lg-12 px-0">
                                                    <a href={`${siteUrls.USER_LOGIN_VIEW}?re=${siteUrls.POST_DETAIL_VIEW}/6120afe2336c6b57ac79de1b`} target="_blank" className="btn btn-lg btn-danger w-100 mt-3" style={{ lineHeight: '50px', fontSize: '16px' }}>MAJİSTRAL</a>
                                                </div>

                                                <div className="col-lg-12 px-0">
                                                    <a href="https://www.teb.org.tr/content_group/10/Mevzuat" target="_blank" className="btn btn-lg btn-danger w-100 mt-3" style={{ lineHeight: '50px', fontSize: '16px' }}>MEVZUAT</a>
                                                </div>
                                                <div className="col-lg-12 px-0 mt-3">
                                                    <div className="card">
                                                        <div className="card-body text-center">
                                                            <a href="http://www.eczanemnerede.com" target="_blank">
                                                                <img src="https://www.teb.org.tr//uploads/bh/41/dier/icon_eczanem_nerede_kirmizi2.jpg" className="w-75 w-xs-25" alt="" />

                                                            </a>
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
                                        <div className="col-lg-2  order-4 order-md-4 text-center">
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