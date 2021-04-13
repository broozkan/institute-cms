import React, { useEffect, useState } from 'react'


import { Link } from 'react-router-dom'
import HeaderSearchForm from './HeaderSearchForm'
import HeaderBanner from './HeaderBanner'
import api from '../../../services/api'
import CommonSpinner from '../Spinner/CommonSpinner'
import NavItemUserProfile from '../NavItem/NavItemUserProfile'
import NavItemLogin from '../NavItem/NavItemLogin'
import NavItemSearch from '../NavItem/NavItemSearch'

const Header = () => {

    const [state, setState] = useState({
        categories: [],
        is_categories_loaded: false
    })



    useEffect(() => {
        getCategoryList()
    }, [])



    const getCategoryList = async () => {
        const categoryData = await api.get('/categories/1', { params: { 'ne_announcement': '1' } }, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            categories: categoryData.data.docs,
            is_categories_loaded: true
        })
    }



    const getHref = (item) => {
        let href = ""
        if (item.category_type === "to_post") {
            href = "/post/detail/" + item.category_post_id + "?t=" + item.category_name
        } else if (item.category_type === "external_link") {
            href = "/redirect/?link=" + item.category_external_url
        } else if (item.category_type === "category_list") {
            href = "/category/detail/" + item._id + "/" + item.category_name
        }

        return href
    }


    // render categories
    let categoriesHtml = <CommonSpinner />
    if (state.is_categories_loaded) {
        categoriesHtml = state.categories.map((item, index) => {
            let childCategoriesHtml = ""
            let dropdownClassName = ""
            let dropdownString = ""
            if (item.is_category_main) {
                let categorySubCategories = state.categories.map((childCategoryItem, childCategoryIndex) => {
                    let childCategoryHtml = ""

                    if (!childCategoryItem.is_category_main) {
                        if (childCategoryItem.category_upper_category_id == item._id) {
                            state.categories.map((secondChildCategoryItem, secondChildCategoryIndex) => {
                                if (secondChildCategoryItem.category_upper_category_id) {


                                    if (secondChildCategoryItem.category_upper_category_id == item._id) {

                                        dropdownClassName = "mega-dropdown-menu dropdown-menu"
                                        dropdownString = "dropdown"

                                        let thirdChildCategoryHtml = ""
                                        thirdChildCategoryHtml = state.categories.map((thirdChildCategoryItem, thirdChildCategoryIndex) => {
                                            if (thirdChildCategoryItem.category_upper_category_id) {
                                                if (thirdChildCategoryItem.category_upper_category_id == childCategoryItem._id) {

                                                    const href = getHref(thirdChildCategoryItem)

                                                    return (
                                                        <li>
                                                            <a className="dropdown-item" href={href} > <span className="fa fa-chevron-right broozkan"></span> {thirdChildCategoryItem.category_name}</a>
                                                        </li>
                                                    )

                                                }
                                            }
                                        })

                                        const href = getHref(childCategoryItem)

                                        childCategoryHtml = (
                                            <div className="dropdown-card">
                                                <h6>
                                                    <a href={href}>{childCategoryItem.category_name}</a>
                                                </h6>
                                                <ul>
                                                    {thirdChildCategoryHtml}
                                                </ul>
                                            </div>
                                        )

                                        //console.log(childCategoryItem.category_name + ">>>" + secondChildCategoryItem.category_name);


                                    } else {

                                        /*dropdownClassName = "dropdown-menu"
                                        dropdownString = "dropdown"

                                        childCategoryHtml = (
                                            <div className="col-lg-4">
                                                <a to={"/category/" + childCategoryItem._id}>
                                                    <a className={dropdownString + "-item"} href="#"> <span className="fa fa-chevron-right"></span> {childCategoryItem.category_name}</a>
                                                </a>
                                            </div>

                                        )*/

                                    }
                                }
                            })
                            return childCategoryHtml


                        } else {

                        }
                    }
                })


                const href = getHref(item)

                return (
                    <li className={"nav-item active " + dropdownString}>
                        <a href={href} className={dropdownString + "-toggle nav-link "} id="navbarDropdownMenuLink" data-toggle={dropdownString} aria-haspopup="true" aria-expanded="false"><a  > {item.category_name} <span className="sr-only">(current)</span></a></a>
                        <div className={dropdownClassName} aria-labelledby="navbarDropdownMenuLink">
                            <div className="row">
                                {categorySubCategories}

                            </div>
                        </div>

                    </li>
                )
            }



        })
    }

    let navbarLoginHtml = ''
    const user = localStorage.getItem('dashboard-auth-token')

    if (!user) {
        navbarLoginHtml = <NavItemLogin />
    } else {
        navbarLoginHtml = <NavItemUserProfile />
    }

    return (
        <header className="header-area header-wrapper home-2">
            <div className="header-middle-area  transparent-header headroom">
                <div className="container">
                    <HeaderBanner />
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="full-width-mega-dropdown row">
                                <div className="col-lg-12 text-right d-lg-block">
                                    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 px-0">
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"></span>
                                        </button>

                                        <div className="collapse navbar-collapse justify-content-between" id="navbarNavDropdown">
                                            <ul className="navbar-nav">
                                                <li className="nav-item active">
                                                    <a className=" -toggle nav-link nav-link" id="navbarDropdownMenuLink" href="/"><a  > ANASAYFA <span className="sr-only">(current)</span></a></a>
                                                    <div class="" aria-labelledby="navbarDropdownMenuLink"></div>
                                                </li>
                                                {categoriesHtml}
                                                <NavItemSearch />
                                            </ul>

                                            <ul className="navbar-nav float-right">
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


export default Header