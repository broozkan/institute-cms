import React, { useEffect, useState, useContext } from 'react'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import CardUserPanelQuery from '../../../../components/Site/Card/CardUserPanelQuery'
import { SiteContextWrapper, SiteContext } from '../../../../contexts/Site/SiteContext'
import { siteUrls } from '../../../../lib/Site/siteUrls'

const Dashboard = () => {

    const siteContext = useContext(SiteContext)

    console.log(siteContext);
    return (
        <div>
            <PageTitle title={["Kullanıcı İşlemleri"]} />

            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                            <div className="row">
                                <CardUserPanelQuery
                                    query={{
                                        query_href: siteUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW,
                                        query_name: "Eğitim Videoları",
                                        query_icon_class: "fa fa-video-camera"
                                    }}
                                />
                                <CardUserPanelQuery
                                    query={{
                                        query_href: siteUrls.CLOSE_EXPIRATION_LIST_VIEW,
                                        query_name: "Miadı Yakın Alım",
                                        query_icon_class: "fa fa-shopping-basket"
                                    }}
                                />
                                <CardUserPanelQuery
                                    query={{
                                        query_href: siteUrls.ANNOUNCEMENT_LIST_VIEW,
                                        query_name: "İlanlar",
                                        query_icon_class: "fa fa-newspaper-o"
                                    }}
                                />
                                <CardUserPanelQuery
                                    query={{
                                        query_href: siteUrls.USER_FILE_LIST_VIEW,
                                        query_name: "Belge-Döküman",
                                        query_icon_class: "fa fa-file"
                                    }}
                                />
                                <CardUserPanelQuery
                                    query={{
                                        query_href: siteUrls.NOTIFICATION_LIST_VIEW,
                                        query_name: "Bildirimlerim",
                                        query_icon_class: "fa fa-bell"
                                    }}
                                />
                                <CardUserPanelQuery
                                    query={{
                                        query_href: siteUrls.USER_PROFILE_VIEW,
                                        query_name: "Profili Düzenle",
                                        query_icon_class: "fa fa-cogs"
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


}

export default Dashboard
