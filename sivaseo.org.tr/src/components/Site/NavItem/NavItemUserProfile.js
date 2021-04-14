import React from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'
import BadgeNotificationCount from '../Badge/BadgeNotificationCount'


const NavItemUserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <>
            <li class="nav-item dropdown user-profile-nav-item">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                    Ecz. {user.user_name}
                </a>
                <div class="dropdown-menu">
                    <a href={siteUrls.USER_PROFILE_VIEW} class="dropdown-item"> <span className="fa fa-user"></span> Profilim</a>
                    <a href={siteUrls.USER_DASHBOARD_VIEW} class="dropdown-item"> <span className="fa fa-cogs"></span> Kullanıcı İşlemleri</a>
                    <a href={siteUrls.USER_LOGOUT_VIEW} class="dropdown-item"><span className="fa fa-sign-out"></span> Oturumumu Kapat</a>
                </div>
            </li>
            <li class="nav-item active user-profile-nav-item">
                <a href={siteUrls.USER_LOGIN_VIEW} className="nav-link" id="navbarDropdownMenuLink">
                    <span className="fa fa-bell"></span>
                    <BadgeNotificationCount />
                </a>
            </li>
        </>
    )
}

export default NavItemUserProfile