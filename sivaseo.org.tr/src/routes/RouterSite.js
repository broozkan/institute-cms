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
import FormSearch from '../components/Site/Form/FormSearch'
import SearchResultView from '../views/Site/Search/SearchResultView'
import NotificationList from '../views/Site/User/Notification/NotificationList'
import NotificationDetail from '../views/Site/User/Notification/NotificationDetail'



const Routes = () => {
    const location = useLocation()

    const siteContext = useContext(SiteContext)

    return (
        <>
            <SiteContextWrapper>
                <FormSearch />

                <Router>
                    <Header />
                    <div id="page-content" className="page-wrapper">
                        <Switch>
                            <Route path={`${siteUrls.HOME_VIEW}`} exact component={HomePage}></Route>
                            <Route path={`${siteUrls.USER_LOGIN_VIEW}`} exact component={Login}></Route>

                            <Route path={`${siteUrls.USER_LOGOUT_VIEW}`} exact component={Logout}></Route>

                            <Route path={siteUrls.USER_DASHBOARD_VIEW} exact component={Dashboard}></Route>

                            <Route path={siteUrls.USER_PROFILE_VIEW} exact component={Profile}></Route>

                            <Route path={siteUrls.NOTIFICATION_LIST_VIEW} exact component={NotificationList}></Route>
                            <Route path={`${siteUrls.NOTIFICATION_DETAIL_VIEW}/:notificationId`} exact component={NotificationDetail}></Route>

                            <Route path={siteUrls.CLOSE_EXPIRATION_LIST_VIEW} exact component={CloseExpirationMedicineList}></Route>
                            <Route path={siteUrls.NEW_CLOSE_EXPIRATION_VIEW} exact component={NewCloseExpirationMedicine}></Route>
                            <Route path={`${siteUrls.UPDATE_CLOSE_EXPIRATION_VIEW}/:closeExpirationId`} exact component={UpdateCloseExpirationMedicine}></Route>

                            <Route path={siteUrls.ANNOUNCEMENT_LIST_VIEW} exact component={AnnouncementList}></Route>
                            <Route path={siteUrls.NEW_ANNOUNCEMENT_VIEW} exact component={NewAnnouncement}></Route>
                            <Route path={`${siteUrls.ANNOUNCEMENT_DETAIL_VIEW}/:categoryId`} exact component={AnnouncementDetail}></Route>
                            <Route path={`${siteUrls.UPDATE_ANNOUNCEMENT_VIEW}/:announcementId`} exact component={UpdateAnnouncement}></Route>

                            <Route path={siteUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW} exact component={EducateVideoPlaylistList}></Route>
                            <Route path={`${siteUrls.EDUCATION_VIDEO_PLAYLIST_DETAIL_VIEW}/:educationVideoPlaylistId`} exact component={EducateVideoPlaylistDetail}></Route>

                            <Route path={siteUrls.USER_FILE_LIST_VIEW} exact component={FileList}></Route>

                            <Route path={`${siteUrls.CONTACT_VIEW}`} exact component={ContactPage}></Route>
                            <Route path={`${siteUrls.REDIRECT_VIEW}`} exact component={RedirectView}></Route>

                            <Route path={`${siteUrls.POST_DETAIL_VIEW}/:postId`} exact component={PostDetail}></Route>

                            <Route path={`${siteUrls.CATEGORY_DETAIL_VIEW}/:categoryId/:categoryName`} exact component={CategoryDetail}></Route>
                            <Route path={`${siteUrls.SEARCH_RESULT_VIEW}/:search`} exact component={SearchResultView}></Route>
                        </Switch>
                        <Footer />

                    </div>

                </Router>
            </SiteContextWrapper>

        </>
    )
}


export default Routes