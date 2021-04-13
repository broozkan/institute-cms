import React, { useState } from 'react'
import TableAnnouncement from '../../../../components/Site/Table/TableAnnouncement'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'
import { Link } from 'react-router-dom'
import CardUserPanelQuery from '../../../../components/Site/Card/CardUserPanelQuery'
import { Component } from 'react'
class AnnouncementDetail extends Component {
    render() {
        return (
            <>
                <PageTitle title={["Kullanıcı İşlemleri", "Devir Eczane İlanları"]} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="section-title">
                                <LinkReturnDashboard />
                                <Link to="/user/announcement/new" className="btn btn-outline-success btn-lg mt-4 float-right"> <span className="fa fa-plus"></span> Yeni İlan Ekle</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-body ptb-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                                <TableAnnouncement params={{ 'announcement_category._id': this.props.match.params.categoryId }} />

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}


export default AnnouncementDetail