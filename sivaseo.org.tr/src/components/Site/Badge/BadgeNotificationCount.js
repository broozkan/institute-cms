import React, { useEffect, useState } from 'react'
import api from '../../../services/api'


const BadgeNotificationCount = () => {

    const [notificationCount, setNotificationCount] = useState(0)

    useEffect(() => {
        getNotificationCount()
    })

    const getNotificationCount = async () => {
        const user = JSON.parse(localStorage.getItem('user'))
        const notificationCount = await api.get('/notifications/1', { params: { 'notification_users.user._id': user._id } })

        setNotificationCount(notificationCount.data.docs.length)


    }

    return (
        <span className="badge badge-danger badge-notification-count">{notificationCount}</span>
    )
}


export default BadgeNotificationCount