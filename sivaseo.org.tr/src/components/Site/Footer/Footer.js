import React from 'react'
import logo from '../../../images/logo/sivaseo_logo.jpeg'

const Footer = () => {
    return (
        <footer>
            <div className="footer footer-top-area border-b pt-70 pb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="footer-box">
                                <div className="h-title mb-15"><img src={logo} alt="" /></div>
                                <ul className="footer-contact-us">
                                    <li>
                                        <span> © 2020 37. Bölge Sivas Eczacı Odası , Tüm Hakları Saklıdır.</span>
                                    </li>
                                    <li>
                                        <i className="fa fa-phone"></i>
                                        <span> <a href="tel:03462236506">0 (346) 223 65 06</a> </span>
                                    </li>
                                    <li>
                                        <i className="fa fa-envelope"></i>
                                        <span> <a href="mailto:iletisim@sivaseo.org.tr">iletisim@sivaseo.org.tr</a> </span>
                                    </li>
                                    <li>
                                        <i className="fa fa-map-marker"></i>
                                        <span> Arı Sitesi A Blok Kat:1  Sivas / Merkez</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 col-lg-3 d-md-none d-block d-lg-block">
                            <div className="footer-box">
                                <h4 className="h-title">Site Haritası</h4>
                                <ul className="footer-menu">
                                    <li><a href="#">Anasayfa</a></li>
                                    <li><a href="#">Nöbetçi Eczaneler</a></li>
                                    <li><a href="#">Kurumsal</a></li>
                                    <li><a href="#">Üye Girişi</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-2 d-none d-xl-block">
                            <div className="footer-box">
                                <h4 className="h-title">Kısayollar</h4>
                                <ul className="footer-menu">
                                    <li><a href="#">SGK MEDULA</a></li>
                                    <li><a href="#">SGK MEDİKAL</a></li>
                                    <li><a href="#">RENKLİ REÇETE SİSTEMİ</a></li>
                                    <li><a href="#">FARMAINBOX</a></li>
                                    <li><a href="#">YURTDIŞINDAN İLAÇ TEMİNİ</a></li>
                                    <li><a href="#">İTS</a></li>
                                    <li><a href="#">ÜTS</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-5 col-md-6">
                            <div className="footer-box">
                                <h4 className="h-title">ODAMIZDAN KARELER</h4>
                                <div className="instragram-box">
                                    <ul>
                                        <li>
                                            <a href="#"><img src="images/instragram/1.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src="images/instragram/2.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src="images/instragram/3.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src="images/instragram/4.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src="images/instragram/5.jpg" alt="" /></a>
                                        </li>
                                        <li>
                                            <a href="#"><img src="images/instragram/6.jpg" alt="" /></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bootom_area default-bg ptb-10">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="copy-text">
                                © 2020 37. Bölge Sivas Eczacı Odası. Tüm Hakları Saklıdır.
                                    </div>
                        </div>
                        <div className="col-md-6">
                            <div className="footer-social text-right">
                                <ul className="social-icon">
                                    <li>Bizi takip edin : </li>
                                    <li>
                                        <a href="#"><i aria-hidden="true" className="fa fa-instragram"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i aria-hidden="true" className="fa fa-facebook"></i></a>
                                    </li>
                                    <li>
                                        <a href="#"><i aria-hidden="true" className="fa fa-twitter"></i></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer