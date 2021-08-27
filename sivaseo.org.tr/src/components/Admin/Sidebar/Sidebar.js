import React from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'


const Sidebar = () => {
    return (
        <div class="bg-darkgray border-right" id="sidebar-wrapper" >
            <div class="sidebar-heading">37. Bölge Sivas Eczacılar Odası Yönetim Paneli </div>
            <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action bg-light"><span className="fa fa-cog"></span> Yönetim</a>
                <a href={adminUrls.USER_LIST_VIEW} class="list-group-item list-group-item-action bg-light"><span className="fa fa-users"></span> Kullanıcılar</a>
                <a href={adminUrls.CATEGORY_LIST_VIEW} class="list-group-item list-group-item-action bg-light"><span className="fa fa-list"></span> Kategoriler</a>
                <a href={adminUrls.POST_LIST_VIEW} class="list-group-item list-group-item-action bg-light"><span className="fa fa-file"></span> Yazılar</a>
                <a href={adminUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW} class="list-group-item list-group-item-action bg-light"><span className="fa fa-file"></span> Eğitim Videoları</a>
                <a href={adminUrls.NOTIFICATION_LIST_VIEW} class="list-group-item list-group-item-action bg-light"><span className="fa fa-file"></span> Bildirimler</a>
                <a href={adminUrls.LOGOUT_VIEW} class="list-group-item list-group-item-action bg-light"><span className="fa fa-sign-out"></span> Çıkış Yap</a>

            </div>
        </div>
    )
}

export default Sidebar