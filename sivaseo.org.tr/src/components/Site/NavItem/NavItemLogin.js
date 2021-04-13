import React from 'react'
import { Link } from 'react-router-dom'


const NavItemLogin = () => {


    return (
        <>
            <li class="nav-item active ">
                <a href="/user/login" className="nav-link" id="navbarDropdownMenuLink">
                    <span className="fa fa-lock"></span> ÜYE GİRİŞİ
                </a>
            </li>
        </>
    )
}

export default NavItemLogin