import React from 'react'
import NavItemLogin from '../NavItem/NavItemLogin'
import NavItemUserProfile from '../NavItem/NavItemUserProfile'
import HeaderBanner from './HeaderBanner'

import { Link } from 'react-router-dom'
import NavItemSearch from '../NavItem/NavItemSearch'


const HeaderNew = () => {


    let navbarLoginHtml = ''
    const user = localStorage.getItem('dashboard-auth-token')

    if (!user) {
        navbarLoginHtml = <NavItemLogin />
    } else {
        navbarLoginHtml = <NavItemUserProfile />
    }

    return (
        <header class="header-area header-wrapper home-2">
            <div class="header-middle-area  transparent-header headroom">
                <div class="container">
                    <HeaderBanner />
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="full-width-mega-dropdown row">
                                <div class="col-lg-12 text-right d-lg-block">
                                    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3 px-0">
                                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                        <div class="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                                            <ul class="navbar-nav">
                                                <li class="nav-item active">
                                                    <a class=" -toggle nav-link nav-link" id="navbarDropdownMenuLink" href="/">
                                                        <a> ANASAYFA <span class="sr-only">(current)</span></a>
                                                    </a>
                                                    <div class="" aria-labelledby="navbarDropdownMenuLink">
                                                    </div>
                                                </li>
                                                <li class="nav-item active dropdown">
                                                    <a class="dropdown-toggle nav-link " id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/">
                                                        <a> HAKKIMIZDA <span class="sr-only">(current)</span></a>
                                                    </a>
                                                    <div class="mega-dropdown-menu dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <div class="row">
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/category/detail/5f91803392748434085d3314?t=Hakk??m??zda">Hakk??m??zda</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/post/detail/5f8eebb1e42c5d40ac83da52?t=Y??NET??M KURULU">
                                                                            <span class="fa fa-chevron-right broozkan"></span> Y??NET??M KURULU
                                                                                                    </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/post/detail/5f8ef729e42c5d40ac83da60?t=DENETLEME KURULU">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                        DENETLEME KURULU
                                                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/post/detail/5f8ef771e42c5d40ac83da62?t=HAYS??YET KURULU">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                            HAYS??YET KURULU
                                                                                                            </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/post/detail/5f8ef8a6e42c5d40ac83da68?t=KOM??SYONLARIMIZ">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                                KOM??SYONLARIMIZ
                                                                                                                </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/https://docs.google.com/spreadsheets/d/1i2DorTDSS4J00Wy9QJg2klthNSPfKQ-rhtkxBrIVDw4/edit">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                                    ECZANELER??M??Z
                                                                                                                    </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/post/detail/null?t=FAAL??YET RAPORLARI">
                                                                            <span class="fa fa-chevron-right broozkan">
                                                                            </span> FAAL??YET RAPORLARI</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="nav-item active dropdown">
                                                    <a class="dropdown-toggle nav-link " id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/">
                                                        <a> DUYURULAR <span class="sr-only">(current)</span></a>
                                                    </a>
                                                    <div class="mega-dropdown-menu dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <div class="row">
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/">BA??KANDAN</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                                                                            Ba??kandan Duyurular
                                                                                                                                                            </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/">TEB DUYURULARI</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f91860392748434085d3316?t=TEB Duyurular??">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                                                                                            TEB Duyurular??</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/">ODA DUYURULARI</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f91861492748434085d3317?t=ODA Duyurular??">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                                                                                                            ODA Duyurular??
                                                                                                                                                                                            </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/">??ALI??MA RAPORLARI</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f91862492748434085d3318?t=??al????ma Rapolar??">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                                                                                                                                                            ??al????ma Rapolar??
                                                                                                                                                                                                            </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="nav-item active ">
                                                    <a class="-toggle nav-link " id="navbarDropdownMenuLink" data-toggle="" aria-haspopup="true" aria-expanded="false" href="/category/detail/5f8850f5cd795636387971a3?t=ETK??NL??KLER">
                                                        <a> ETK??NL??KLER
                                                                                                                                                                                                                        <span class="sr-only">(current)</span>
                                                        </a>
                                                    </a>
                                                    <div class="" aria-labelledby="navbarDropdownMenuLink">
                                                        <div class="row">
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="nav-item active dropdown">
                                                    <a class="dropdown-toggle nav-link " id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="/">
                                                        <a> ??YE ????LEMLER?? <span class="sr-only">(current)</span></a>
                                                    </a>
                                                    <div class="mega-dropdown-menu dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                        <div class="row">
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/">Eczane Rehberi</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                            Eczane Rehberi
                                                                        </a>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                            Yasa ve Y??netmelikler
                                                                        </a>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                            Sa??l??k Uygulama Tebli??i
                                                                        </a>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                            Mevzuat
                                                                        </a>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                            S.S.S
                                                                        </a>
                                                                        <a class="dropdown-item" href="/category/detail/5f9185e892748434085d3315?t=Ba??kandan Duyurular">
                                                                            <span class="fa fa-chevron-right broozkan"></span>
                                                                            Alkol Hesaplay??c??
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="dropdown-card">
                                                                <h6>
                                                                    <a href="/">DOSYA & BELGE</a>
                                                                </h6>
                                                                <ul>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f91860392748434085d3316?t=TEB Duyurular??">
                                                                            <span class="fa fa-chevron-right broozkan"></span>                                                                                                
                                                                            Dosyalar-Belgeler
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f91860392748434085d3316?t=TEB Duyurular??">
                                                                            <span class="fa fa-chevron-right broozkan"></span>                                                                                                
                                                                            Formlar
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <a class="dropdown-item" href="/category/detail/5f91860392748434085d3316?t=TEB Duyurular??">
                                                                            <span class="fa fa-chevron-right broozkan"></span>                                                                                                
                                                                            Dilek??eler
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="nav-item active ">
                                                    <a class="-toggle nav-link " id="navbarDropdownMenuLink" data-toggle="" aria-haspopup="true" aria-expanded="false" href="/"><a>
                                                        BASINDA B??Z <span class="sr-only">(current)</span>
                                                    </a>
                                                    </a>
                                                    <div class="" aria-labelledby="navbarDropdownMenuLink">
                                                        <div class="row">
                                                        </div>
                                                    </div>
                                                </li>

                                                <li class="nav-item active ">
                                                    <a class="-toggle nav-link " id="navbarDropdownMenuLink" data-toggle="" aria-haspopup="true" aria-expanded="false" href="/contact"><a>
                                                        ??LET??????M
                                                                                                                                                                                                                                                        <span class="sr-only">(current)</span>
                                                    </a>
                                                    </a>
                                                    <div class="" aria-labelledby="navbarDropdownMenuLink">
                                                        <div class="row"></div>
                                                    </div>
                                                </li>
                                                
                                                <li class="nav-item active">
                                                    <a class="nav-link" href="#"> <span class="fa fa-search"></span></a>
                                                </li>
                                            </ul>
                                            <ul class="navbar-nav float-right">
                                                {navbarLoginHtml}
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

    )


}

export default HeaderNew