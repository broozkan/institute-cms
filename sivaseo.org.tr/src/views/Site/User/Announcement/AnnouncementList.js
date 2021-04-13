import React, { useState } from 'react'
import TableAnnouncement from '../../../../components/Site/Table/TableAnnouncement'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'
import { Link } from 'react-router-dom'
import CardUserPanelQuery from '../../../../components/Site/Card/CardUserPanelQuery'
import { Component } from 'react'
import api from '../../../../services/api'
import CommonSpinner from '../../../../components/Site/Spinner/CommonSpinner'
import { siteUrls } from '../../../../lib/Site/siteUrls'
class AnnouncementList extends Component {

    constructor() {
        super()

        this.state = {
            categories: [],
            is_categories_loaded: false
        }
        this.getCategories = this.getCategories.bind(this)
    }

    componentDidMount() {
        this.getCategories()
    }

    async getCategories() {
        const categories = await api.get('/categories/1', { params: { 'category_type': 'announcement' }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState({
            categories: categories.data.docs,
            is_categories_loaded: true
        })
    }

    render() {

        // render categories
        let categoriesJsx = <CommonSpinner />
        if (this.state.is_categories_loaded) {
            categoriesJsx = this.state.categories.map((item) => {
                return (
                    <CardUserPanelQuery
                        query={{
                            query_href: `${siteUrls.ANNOUNCEMENT_DETAIL_VIEW}/${item._id}`,
                            query_name: item.category_name,
                            query_icon_class: "fa fa-bullhorn"
                        }}
                    />
                )
            })
        }

        return (
            <>
                <PageTitle title={["Kullanıcı İşlemleri", "İlanlar Listesi"]} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="section-title">
                                <LinkReturnDashboard />
                                <Link to={siteUrls.NEW_ANNOUNCEMENT_VIEW} className="btn btn-outline-success btn-lg mt-4 float-right"> <span className="fa fa-plus"></span> Yeni İlan Ekle</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body ptb-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                                <div className="row">
                                    {categoriesJsx}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}


export default AnnouncementList