import React, { useState } from 'react'
import FormAnnouncement from '../../../../components/Site/Form/FormAnnouncement'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'

const UpdateAnnouncement = (props) => {


    return (

        <>
                <PageTitle title={["Kullanıcı İşlemleri", "İlanlar", "İlan Düzenle"]} />
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
                                <FormAnnouncement announcement_id={props.match.params.announcementId} />
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )

}


export default UpdateAnnouncement