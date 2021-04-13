import React, { Component } from 'react'
import profile_photo from '../../images/avatars/1.jpg'
import { Link } from 'react-router-dom'
import Logo from './Logo'

class Header extends React.Component {

    constructor() {
        super()


        this.state = JSON.parse(localStorage.getItem('user'))

    }

    render() {
        return (
            <div className="app-header header-shadow">
                <div className="app-header__logo">
                    <div className="logo-src">
                        <Logo /> 
                    </div>
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
                </div>    <div className="app-header__content">
                    <div className="app-header-left">

                    </div>
                    <div className="app-header-right">
                        <div className="header-btn-lg pr-0">
                            <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="btn-group">
                                            <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                                                <img width="42" className="rounded-circle" src={profile_photo} alt="" />
                                                <i className="fa fa-angle-down ml-2 opacity-8"></i>
                                            </a>
                                            <div tabindex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                                <Link to="/user/profile" as="button"><button type="button" tabindex="0" className="dropdown-item">Profil</button></Link>
                                                <div tabindex="-1" className="dropdown-divider"></div>
                                                <Link to="/user/logout" as="button"><button type="button" tabindex="0" className="dropdown-item">Çıkış Yap</button></Link>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget-content-left  ml-3 header-user-info">
                                        <div className="widget-heading">
                                            {this.state.user_username}
                                        </div>
                                        <div className="widget-subheading">
                                            Editör
                                        </div>
                                    </div>
                                    <div className="widget-content-right header-user-info ml-3">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }



}

export default Header