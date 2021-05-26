import React from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const Navbar = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ecz. {user.user_name}
                        </a>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Profilim</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href={adminUrls.LOGOUT_VIEW}>Çıkış Yap</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}


export default Navbar