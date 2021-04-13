import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import CategoryDetail from '../views/Site/Category/CategoryDetail'
import Login from '../views/Admin/Login/Login'
import PostListView from '../views/Admin/Post/PostListView'
import { UserContextWrapper } from '../contexts/Admin/UserContext'
import Sidebar from '../components/Admin/Sidebar/Sidebar';
import admincss from '../css/admin.css'
import NewPostView from '../views/Admin/Post/NewPostView';
import UpdatePostView from '../views/Admin/Post/UpdatePostView';
import CategoryListView from '../views/Admin/Category/CategoryListView';
import NewCategoryView from '../views/Admin/Category/NewCategoryView';
import UpdateCategoryView from '../views/Admin/Category/UpdateCategoryView';
import Logout from '../views/Admin/Logout/Logout';
import { adminUrls } from '../lib/Admin/adminUrls';
import EducationVideoPlaylistListView from '../views/Admin/EducationVideoPlaylist/EducationVideoPlaylistView';
import NewEducationVideoPlaylistView from '../views/Admin/EducationVideoPlaylist/NewEducationVideoPlaylistView';
import UpdateEducationVideoPlaylistView from '../views/Admin/EducationVideoPlaylist/UpdateEducationVideoPlaylistView';
import UpdateNotificationView from '../views/Admin/Notification/UpdateNotificationView';
import NotificationListView from '../views/Admin/Notification/NotificationListView';
import NewNotificationView from '../views/Admin/Notification/NewNotificationView';

const Routes = () => {
    const location = useLocation()

    return (
        <Router>
            <div class="d-flex" id="wrapper">
                <Switch>
                    <Route path="/admin/login" exact component={Login}></Route>
                    <UserContextWrapper>
                        <Route path="/admin/login" exact component={Login}></Route>
                        <Route path="/admin/logout" exact component={Logout}></Route>


                        <Route path={adminUrls.CATEGORY_LIST_VIEW} exact component={CategoryListView}></Route>
                        <Route path={adminUrls.NEW_CATEGORY_VIEW} exact component={NewCategoryView}></Route>
                        <Route path={`${adminUrls.UPDATE_CATEGORY_VIEW}/:categoryId`} exact component={UpdateCategoryView}></Route>

                        <Route path={adminUrls.NOTIFICATION_LIST_VIEW} exact component={NotificationListView}></Route>
                        <Route path={adminUrls.NEW_NOTIFICATION_VIEW} exact component={NewNotificationView}></Route>
                        <Route path={`${adminUrls.UPDATE_NOTIFICATION_VIEW}/:notificationId`} exact component={UpdateNotificationView}></Route>

                        <Route path={adminUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW} exact component={EducationVideoPlaylistListView}></Route>
                        <Route path={adminUrls.NEW_EDUCATION_VIDEO_PLAYLIST_VIEW} exact component={NewEducationVideoPlaylistView}></Route>
                        <Route path={`${adminUrls.UPDATE_EDUCATION_VIDEO_PLAYLIST_VIEW}/:educationVideoPlaylistId`} exact component={UpdateEducationVideoPlaylistView}></Route>

                        <Route path="/admin" exact component={PostListView}></Route>
                        <Route path={adminUrls.POST_LIST_VIEW} exact component={PostListView}></Route>
                        <Route path={adminUrls.NEW_POST_VIEW} exact component={NewPostView}></Route>
                        <Route path={`${adminUrls.UPDATE_POST_VIEW}/:postId`} exact component={UpdatePostView}></Route>

                    </UserContextWrapper>

                </Switch>

            </div>

        </Router >
    )
}


export default Routes