import React from 'react'
import Header from './Common/Header'
import Sidebar from './Common/Sidebar'

import Login from './User/Login'

import UserList from './User/UserList'
import NewUser from './User/NewUser'
import UpdateUser from './User/UpdateUser'

import CategoryList from './Category/CategoryList'
import NewCategory from './Category/NewCategory'
import UpdateCategory from './Category/UpdateCategory'


import PostList from './Post/PostList'
import NewPost from './Post/NewPost'
import UpdatePost from './Post/UpdatePost'

import ShortcutList from './Shortcut/ShortcutList'
import NewShortcut from './Shortcut/NewShortcut'
import UpdateShortcut from './Shortcut/UpdateShortcut'

import SliderList from './Slider/SliderList'
import NewSlider from './Slider/NewSlider'
import UpdateSlider from './Slider/UpdateSlider'


import CommentList from './Comment/CommentList'
import UpdateComment from './Comment/UpdateComment'


import FeedbackList from './Feedback/FeedbackList'
import UpdateFeedback from './Feedback/UpdateFeedback'

import FormList from './Form/FormList'
import NewForm from './Form/NewForm'
import UpdateForm from './Form/UpdateForm'

import EducationVideoPlaylistList from './EducationVideoPlaylist/EducationVideoPlaylistList'
import NewEducationVideoPlaylist from './EducationVideoPlaylist/NewEducationVideoPlaylist'
import UpdateEducationVideoPlaylist from './EducationVideoPlaylist/UpdateEducationVideoPlaylist'

import CloseExpirationMedicineList from './CloseExpirationMedicine/CloseExpirationMedicineList'
import NewCloseExpirationMedicine from './CloseExpirationMedicine/NewCloseExpirationMedicine'
import UpdateCloseExpirationMedicine from './CloseExpirationMedicine/UpdateCloseExpirationMedicine'

import Dashboard from './Dashboard/Dashboard'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'


const home = () => {
    return (
        <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <Header />

            <div className="ui-theme-settings">
                <button type="button" id="TooltipDemo" className="btn-open-options btn btn-warning">
                    <i className="fa fa-cog fa-w-16 fa-spin fa-2x"></i>
                </button>
                <div className="theme-settings__inner">
                    <div className="scrollbar-container">
                        <div className="theme-settings__options-wrapper">
                            <h3 className="themeoptions-heading">Layout Options
                        </h3>
                            <div className="p-3">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left mr-3">
                                                    <div className="switch has-switch switch-container-class" data-class="fixed-header">
                                                        <div className="switch-animate switch-on">
                                                            <input type="checkbox" checked data-toggle="toggle" data-onstyle="success" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget-content-left">
                                                    <div className="widget-heading">Fixed Header
                                                </div>
                                                    <div className="widget-subheading">Makes the header top fixed, always visible!
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left mr-3">
                                                    <div className="switch has-switch switch-container-class" data-class="fixed-sidebar">
                                                        <div className="switch-animate switch-on">
                                                            <input type="checkbox" checked data-toggle="toggle" data-onstyle="success" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget-content-left">
                                                    <div className="widget-heading">Fixed Sidebar
                                                </div>
                                                    <div className="widget-subheading">Makes the sidebar left fixed, always visible!
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="widget-content p-0">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left mr-3">
                                                    <div className="switch has-switch switch-container-class" data-class="fixed-footer">
                                                        <div className="switch-animate switch-off">
                                                            <input type="checkbox" data-toggle="toggle" data-onstyle="success" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="widget-content-left">
                                                    <div className="widget-heading">Fixed Footer
                                                </div>
                                                    <div className="widget-subheading">Makes the app footer bottom fixed, always visible!
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <h3 className="themeoptions-heading">
                                <div>
                                    Header Options
                            </div>
                                <button type="button" className="btn-pill btn-shadow btn-wide ml-auto btn btn-focus btn-sm switch-header-cs-class" data-class="">
                                    Restore Default
                            </button>
                            </h3>
                            <div className="p-3">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h5 className="pb-2">Choose Color Scheme
                                    </h5>
                                        <div className="theme-settings-swatches">
                                            <div className="swatch-holder bg-primary switch-header-cs-class" data-class="bg-primary header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-secondary switch-header-cs-class" data-class="bg-secondary header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-success switch-header-cs-class" data-class="bg-success header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-info switch-header-cs-class" data-class="bg-info header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-warning switch-header-cs-class" data-class="bg-warning header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-danger switch-header-cs-class" data-class="bg-danger header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-light switch-header-cs-class" data-class="bg-light header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-dark switch-header-cs-class" data-class="bg-dark header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-focus switch-header-cs-class" data-class="bg-focus header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-alternate switch-header-cs-class" data-class="bg-alternate header-text-light">
                                            </div>
                                            <div className="divider">
                                            </div>
                                            <div className="swatch-holder bg-vicious-stance switch-header-cs-class" data-class="bg-vicious-stance header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-midnight-bloom switch-header-cs-class" data-class="bg-midnight-bloom header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-night-sky switch-header-cs-class" data-class="bg-night-sky header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-slick-carbon switch-header-cs-class" data-class="bg-slick-carbon header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-asteroid switch-header-cs-class" data-class="bg-asteroid header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-royal switch-header-cs-class" data-class="bg-royal header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-warm-flame switch-header-cs-class" data-class="bg-warm-flame header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-night-fade switch-header-cs-class" data-class="bg-night-fade header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-sunny-morning switch-header-cs-class" data-class="bg-sunny-morning header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-tempting-azure switch-header-cs-class" data-class="bg-tempting-azure header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-amy-crisp switch-header-cs-class" data-class="bg-amy-crisp header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-heavy-rain switch-header-cs-class" data-class="bg-heavy-rain header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-mean-fruit switch-header-cs-class" data-class="bg-mean-fruit header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-malibu-beach switch-header-cs-class" data-class="bg-malibu-beach header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-deep-blue switch-header-cs-class" data-class="bg-deep-blue header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-ripe-malin switch-header-cs-class" data-class="bg-ripe-malin header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-arielle-smile switch-header-cs-class" data-class="bg-arielle-smile header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-plum-plate switch-header-cs-class" data-class="bg-plum-plate header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-happy-fisher switch-header-cs-class" data-class="bg-happy-fisher header-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-happy-itmeo switch-header-cs-class" data-class="bg-happy-itmeo header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-mixed-hopes switch-header-cs-class" data-class="bg-mixed-hopes header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-strong-bliss switch-header-cs-class" data-class="bg-strong-bliss header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-grow-early switch-header-cs-class" data-class="bg-grow-early header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-love-kiss switch-header-cs-class" data-class="bg-love-kiss header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-premium-dark switch-header-cs-class" data-class="bg-premium-dark header-text-light">
                                            </div>
                                            <div className="swatch-holder bg-happy-green switch-header-cs-class" data-class="bg-happy-green header-text-light">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <h3 className="themeoptions-heading">
                                <div>Sidebar Options</div>
                                <button type="button" className="btn-pill btn-shadow btn-wide ml-auto btn btn-focus btn-sm switch-sidebar-cs-class" data-class="">
                                    Restore Default
                            </button>
                            </h3>
                            <div className="p-3">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h5 className="pb-2">Choose Color Scheme
                                    </h5>
                                        <div className="theme-settings-swatches">
                                            <div className="swatch-holder bg-primary switch-sidebar-cs-class" data-class="bg-primary sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-secondary switch-sidebar-cs-class" data-class="bg-secondary sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-success switch-sidebar-cs-class" data-class="bg-success sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-info switch-sidebar-cs-class" data-class="bg-info sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-warning switch-sidebar-cs-class" data-class="bg-warning sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-danger switch-sidebar-cs-class" data-class="bg-danger sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-light switch-sidebar-cs-class" data-class="bg-light sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-dark switch-sidebar-cs-class" data-class="bg-dark sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-focus switch-sidebar-cs-class" data-class="bg-focus sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-alternate switch-sidebar-cs-class" data-class="bg-alternate sidebar-text-light">
                                            </div>
                                            <div className="divider">
                                            </div>
                                            <div className="swatch-holder bg-vicious-stance switch-sidebar-cs-class" data-class="bg-vicious-stance sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-midnight-bloom switch-sidebar-cs-class" data-class="bg-midnight-bloom sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-night-sky switch-sidebar-cs-class" data-class="bg-night-sky sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-slick-carbon switch-sidebar-cs-class" data-class="bg-slick-carbon sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-asteroid switch-sidebar-cs-class" data-class="bg-asteroid sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-royal switch-sidebar-cs-class" data-class="bg-royal sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-warm-flame switch-sidebar-cs-class" data-class="bg-warm-flame sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-night-fade switch-sidebar-cs-class" data-class="bg-night-fade sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-sunny-morning switch-sidebar-cs-class" data-class="bg-sunny-morning sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-tempting-azure switch-sidebar-cs-class" data-class="bg-tempting-azure sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-amy-crisp switch-sidebar-cs-class" data-class="bg-amy-crisp sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-heavy-rain switch-sidebar-cs-class" data-class="bg-heavy-rain sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-mean-fruit switch-sidebar-cs-class" data-class="bg-mean-fruit sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-malibu-beach switch-sidebar-cs-class" data-class="bg-malibu-beach sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-deep-blue switch-sidebar-cs-class" data-class="bg-deep-blue sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-ripe-malin switch-sidebar-cs-class" data-class="bg-ripe-malin sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-arielle-smile switch-sidebar-cs-class" data-class="bg-arielle-smile sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-plum-plate switch-sidebar-cs-class" data-class="bg-plum-plate sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-happy-fisher switch-sidebar-cs-class" data-class="bg-happy-fisher sidebar-text-dark">
                                            </div>
                                            <div className="swatch-holder bg-happy-itmeo switch-sidebar-cs-class" data-class="bg-happy-itmeo sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-mixed-hopes switch-sidebar-cs-class" data-class="bg-mixed-hopes sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-strong-bliss switch-sidebar-cs-class" data-class="bg-strong-bliss sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-grow-early switch-sidebar-cs-class" data-class="bg-grow-early sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-love-kiss switch-sidebar-cs-class" data-class="bg-love-kiss sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-premium-dark switch-sidebar-cs-class" data-class="bg-premium-dark sidebar-text-light">
                                            </div>
                                            <div className="swatch-holder bg-happy-green switch-sidebar-cs-class" data-class="bg-happy-green sidebar-text-light">
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <h3 className="themeoptions-heading">
                                <div>Main Content Options</div>
                                <button type="button" className="btn-pill btn-shadow btn-wide ml-auto active btn btn-focus btn-sm">Restore Default
                            </button>
                            </h3>
                            <div className="p-3">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <h5 className="pb-2">Page Section Tabs
                                    </h5>
                                        <div className="theme-settings-swatches">
                                            <div role="group" className="mt-2 btn-group">
                                                <button type="button" className="btn-wide btn-shadow btn-primary btn btn-secondary switch-theme-class" data-class="body-tabs-line">
                                                    Line
                                            </button>
                                                <button type="button" className="btn-wide btn-shadow btn-primary active btn btn-secondary switch-theme-class" data-class="body-tabs-shadow">
                                                    Shadow
                                            </button>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        <div className="app-main">

                <Router>
                    <Sidebar />

                    <Switch>
                        <Route exact path="/" component={Dashboard}></Route>

                        <Route exact path="/user/login" component={Login}></Route>

                        <Route exact path="/user/new" component={NewUser}></Route>
                        <Route exact path="/user/update/:userId" component={UpdateUser}></Route>
                        <Route exact path="/user/user-list" component={UserList}></Route>


                        <Route exact path="/category/list" component={CategoryList}></Route>
                        <Route exact path="/category/new" component={NewCategory}></Route>
                        <Route exact path="/category/update/:categoryId" component={UpdateCategory}></Route>

                        <Route exact path="/post/list" component={PostList}></Route>
                        <Route exact path="/post/new" component={NewPost}></Route>
                        <Route exact path="/post/update/:postId" component={UpdatePost}></Route>
                        
                        <Route exact path="/shortcut/list" component={ShortcutList}></Route>
                        <Route exact path="/shortcut/new" component={NewShortcut}></Route>
                        <Route exact path="/shortcut/update/:shortcutId" component={UpdateShortcut}></Route>
       
                        <Route exact path="/slider/list" component={SliderList}></Route>
                        <Route exact path="/slider/new" component={NewSlider}></Route>
                        <Route exact path="/slider/update/:sliderId" component={UpdateSlider}></Route>

                        <Route exact path="/comment/list" component={CommentList}></Route>
                        <Route exact path="/comment/update/:commentId" component={UpdateComment}></Route>
                        
                        <Route exact path="/feedback/list" component={FeedbackList}></Route>
                        <Route exact path="/feedback/update/:feedbackId" component={UpdateFeedback}></Route>

                        <Route exact path="/form/list" component={FormList}></Route>
                        <Route exact path="/form/new" component={NewForm}></Route>
                        <Route exact path="/form/update/:formId" component={UpdateForm}></Route>

                        <Route exact path="/education-video-playlist/list" component={EducationVideoPlaylistList}></Route>
                        <Route exact path="/education-video-playlist/new" component={NewEducationVideoPlaylist}></Route>
                        <Route exact path="/education-video-playlist/update/:educationVideoPlaylistId" component={UpdateEducationVideoPlaylist}></Route>

                        <Route exact path="/close-expiration-medicine/list" component={CloseExpirationMedicineList}></Route>
                        <Route exact path="/close-expiration-medicine/new" component={NewCloseExpirationMedicine}></Route>
                        <Route exact path="/close-expiration-medicine/update/:closeExpirationMedicineId" component={UpdateCloseExpirationMedicine}></Route>

                    </Switch>
                </Router>

            </div>
        </div>
    )
}

export default home
