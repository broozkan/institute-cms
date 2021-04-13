import React, { useState } from 'react'
import TableCloseExpirationMedicine from '../../../../components/Site/Table/TableCloseExpirationMedicine'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../../lib/Site/siteUrls'

const CloseExpirationMedicineList = () => {

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Miadı Yakın İlaçlar Listesi"]} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="section-title">
                            <LinkReturnDashboard />
                            <Link to={siteUrls.NEW_CLOSE_EXPIRATION_VIEW} className="btn btn-outline-success float-right mt-4"><i className="fa fa-plus"></i> Yeni Miadı Yakın Ekle</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                            <TableCloseExpirationMedicine />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default CloseExpirationMedicineList