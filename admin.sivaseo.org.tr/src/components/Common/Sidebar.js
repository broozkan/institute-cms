import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="app-sidebar sidebar-shadow">
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div className="scrollbar-sidebar">
                <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                        <li className="app-sidebar__heading">Yönetim</li>

                        <li>
                            <Link to="/" className="mm-active">
                                <i className="metismenu-icon pe-7s-rocket"></i>
                                Yönetim
                            </Link>
                        </li>
                        <li className="app-sidebar__heading">İşleyiş Yönetimi</li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-users"></i>
                                        Kullanıcı Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul>
                                <li>
                                    <Link to="/user/user-list">
                                        <i className="metismenu-icon"></i>
                                        Kullanıcı Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Kullanıcı Ekle
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li className="app-sidebar__heading">İçerik Yönetimi</li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-menu"></i>
                                        Kategori Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul>
                                <li>
                                    <Link to="/category/list">
                                        <i className="metismenu-icon"></i>
                                        Kategori Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/category/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Kategori Ekle
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-link"></i>
                                        Kısayol Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>

                            </a>
                            <ul>
                                <li>
                                    <Link to="/shortcut/list">
                                        <i className="metismenu-icon"></i>
                                        Kısayol Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/shortcut/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Kısayol Ekle
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-volume"></i>
                                        Yazı Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>

                            </a>
                            <ul>
                                <li>
                                    <Link to="/post/list">
                                        <i className="metismenu-icon"></i>
                                        Yazı Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/post/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Yazı Ekle
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-photo-gallery"></i>
                                        Slider Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>

                            </a>
                            <ul>
                                <li>
                                    <Link to="/slider/list">
                                        <i className="metismenu-icon"></i>
                                        Slider Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/slider/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Slider Ekle
                                    </Link>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-copy-file"></i>
                                        Form Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>

                            </a>
                            <ul>
                                <li>
                                    <Link to="/form/list">
                                        <i className="metismenu-icon"></i>
                                        Form Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/form/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Form Ekle
                                    </Link>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <Link to="/comment/list">
                                <i className="metismenu-icon pe-7s-comment"></i>
                                Yorumlar
                            </Link>
                        </li>
                        <li>
                            <Link to="/feedback/list">
                                <i className="metismenu-icon pe-7s-comment"></i>
                                Geri Bildirimler
                            </Link>
                        </li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-menu"></i>
                                        Eğitim Videoları Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul>
                                <li>
                                    <Link to="/education-video-playlist/list">
                                        <i className="metismenu-icon"></i>
                                        Eğitim Videoları Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/education-video-playlist/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Eğitim Videoları Ekle
                                    </Link>
                                </li>

                            </ul>
                        </li>
                        <li>
                            <a href="#">
                                <i className="metismenu-icon pe-7s-menu"></i>
                                        Miadı Yakın İlaç Yönetimi
                                <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                            </a>
                            <ul>
                                <li>
                                    <Link to="/close-expiration-medicine/list">
                                        <i className="metismenu-icon"></i>
                                        Miadı Yakın İlaç Listesi
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/close-expiration-medicine/new">
                                        <i className="metismenu-icon"></i>
                                        Yeni Miadı Yakın İlaç Ekle
                                    </Link>
                                </li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Sidebar