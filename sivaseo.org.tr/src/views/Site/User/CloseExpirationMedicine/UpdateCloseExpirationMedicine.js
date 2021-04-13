import React, { useState } from 'react'
import FormCloseExpiration from '../../../../components/Site/Form/FormCloseExpiration'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'

const UpdateCloseExpirationMedicine = (props) => {


    return (

        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Miadı Yakın İlaçlar", "Miadı Yakın İlaç Düzenle"]} />
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
                            <FormCloseExpiration close_expiration_id={props.match.params.closeExpirationId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default UpdateCloseExpirationMedicine