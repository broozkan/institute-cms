import React from 'react'
import FormProfile from '../../../../components/Site/Form/FormProfile'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'

const Profile = () => {

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Profili Düzenle"]} />
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
                        <div className="col-lg-4 col-md-4 offset-lg-2 offset-md-2">
                            <FormProfile />
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}

export default Profile