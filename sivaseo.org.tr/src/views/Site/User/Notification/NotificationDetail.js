import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import api from '../../../../services/api'
import CommonSpinner from '../../../../components/Site/Spinner/CommonSpinner'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'

const NotificationDetail = (props) => {

    const [notification, setNotification] = useState('')
    const [isNotificationLoaded, setIsNotificationLoaded] = useState(false)


    useEffect(() => {
        getNotification()
    }, [])


    const getNotification = async () => {
        const notification = await api.get('/notifications/1', { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { '_id': props.match.params.notificationId } })

        setNotification(notification.data.docs[0])
        setIsNotificationLoaded(true)

    }

    let notificationJsx = ''
    if (isNotificationLoaded) {
        notificationJsx = (
            <>
                <h5>{notification.notification_title}</h5>
                <div dangerouslySetInnerHTML={{ __html: notification.notification }} />
            </>
        )
    } else {
        notificationJsx = (
            <CommonSpinner />
        )
    }

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Bildirimlerim", "Bildirim Detayı"]} />
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
                            {notificationJsx}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default NotificationDetail