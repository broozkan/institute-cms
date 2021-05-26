import React, { useState } from 'react'
import TableNotification from '../../../../components/Site/Table/TableNotification'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../../lib/Site/siteUrls'

const NotificationList = () => {

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Bildirimlerim"]} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="section-title">
                            <LinkReturnDashboard />
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                            <TableNotification />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default NotificationList