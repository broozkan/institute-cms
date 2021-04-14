import React from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'


const NavItemLogin = () => {


    return (
        <>
            <li class="nav-item active ">
                <a href={siteUrls.USER_LOGIN_VIEW} className="nav-link" id="navbarDropdownMenuLink">
                    <span className="fa fa-lock"></span> ÜYE GİRİŞİ
                </a>
            </li>
        </>
    )
}

export default NavItemLogin