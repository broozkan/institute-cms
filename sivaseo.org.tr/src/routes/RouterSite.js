import React, { useContext } from 'react'
import Header from '../components/Site/Header/Header'
import HomePage from '../views/Site/Home/Home'
import ContactPage from '../views/Site/Contact/Contact'

import PostDetail from '../views/Site/Post/PostDetail'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
} from "react-router-dom";
import CategoryDetail from '../views/Site/Category/CategoryDetail'
import Login from '../views/Site/User/Login/Login'
import Logout from '../views/Site/User/Logout/Logout'
import Dashboard from '../views/Site/User/Dashboard/Dashboard'
import Profile from '../views/Site/User/Profile/Profile'
import CloseExpirationMedicineList from '../views/Site/User/CloseExpirationMedicine/CloseExpirationMedicineList'
import NewCloseExpirationMedicine from '../views/Site/User/CloseExpirationMedicine/NewCloseExpirationMedicine'
import UpdateCloseExpirationMedicine from '../views/Site/User/CloseExpirationMedicine/UpdateCloseExpirationMedicine'
import EducateVideoPlaylistList from '../views/Site/User/EducateVideoPlaylist/EducateVideoPlaylistList'
import EducateVideoPlaylistDetail from '../views/Site/User/EducateVideoPlaylist/EducateVideoPlaylistDetail'
import FileList from '../views/Site/User/File/FileList'
import AnnouncementList from '../views/Site/User/Announcement/AnnouncementList'
import NewAnnouncement from '../views/Site/User/Announcement/NewAnnouncement'
import UpdateAnnouncement from '../views/Site/User/Announcement/UpdateAnnouncement'
import AnnouncementDetail from '../views/Site/User/Announcement/AnnouncementDetail'
import RedirectView from '../views/Site/Redirect/RedirectView'
import { SiteContext } from '../contexts/Site/SiteContext'
import { SiteContextWrapper } from '../contexts/Site/SiteContext'
import Footer from '../components/Site/Footer/Footer'
import { siteUrls } from '../lib/Site/siteUrls'



const Routes = () => {
    const location = useLocation()

    const siteContext = useContext(SiteContext)

    return (
        <>
            <SiteContextWrapper>
                <Router>
                    <Header />
                    <div id="page-content" className="page-wrapper">
                        <Switch>
                            <Route path="/" exact component={HomePage}></Route>
                            <Route path="/user/login" exact component={Login}></Route>

                            <Route path="/user/logout" exact component={Logout}></Route>

                            <Route path={siteUrls.USER_DASHBOARD_VIEW} exact component={Dashboard}></Route>

                            <Route path="/user/profile" exact component={Profile}></Route>

                            <Route path={siteUrls.CLOSE_EXPIRATION_LIST_VIEW} exact component={CloseExpirationMedicineList}></Route>
                            <Route path={siteUrls.NEW_CLOSE_EXPIRATION_VIEW} exact component={NewCloseExpirationMedicine}></Route>
                            <Route path={`${siteUrls.UPDATE_CLOSE_EXPIRATION_VIEW}/:closeExpirationId`} exact component={UpdateCloseExpirationMedicine}></Route>

                            <Route path={siteUrls.ANNOUNCEMENT_LIST_VIEW} exact component={AnnouncementList}></Route>
                            <Route path={siteUrls.NEW_ANNOUNCEMENT_VIEW} exact component={NewAnnouncement}></Route>
                            <Route path={`${siteUrls.ANNOUNCEMENT_DETAIL_VIEW}/:categoryId`} exact component={AnnouncementDetail}></Route>
                            <Route path={`${siteUrls.UPDATE_ANNOUNCEMENT_VIEW}/:announcementId`} exact component={UpdateAnnouncement}></Route>

                            <Route path={siteUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW} exact component={EducateVideoPlaylistList}></Route>
                            <Route path={`${siteUrls.EDUCATION_VIDEO_PLAYLIST_DETAIL_VIEW}/:educationVideoPlaylistId`} exact component={EducateVideoPlaylistDetail}></Route>

                            <Route path="/user/file/list/" exact component={FileList}></Route>

                            <Route path="/contact" exact component={ContactPage}></Route>
                            <Route path="/redirect/" exact component={RedirectView}></Route>

                            <Route path="/post/detail/:postId" exact component={PostDetail}></Route>

                            <Route path="/category/detail/:categoryId/:categoryName" exact component={CategoryDetail}></Route>
                        </Switch>
                        <Footer />

                    </div>

                </Router>
            </SiteContextWrapper>

        </>
    )
}


export default Routes