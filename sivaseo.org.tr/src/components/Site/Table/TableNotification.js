import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'
import api from '../../../services/api'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'


const TableNotification = () => {

    const [state, setState] = useState({
        notifications: [],
        pagination_info: '',
        is_notifications_loaded: false,

    })


    useEffect(() => {
        getNotifications()
    }, [])


    const getNotifications = async (page = 1) => {
        setState({
            ...state,
            is_notifications_loaded: false
        })

        const user = JSON.parse(localStorage.getItem('user'))
        const Notifications = await api.get(`/notifications/${page}`, { headers: { 'auth-token': localStorage.getItem('auth-token') }, params: { 'notification_users.user._id': user._id } })

        setState({
            ...state,
            notifications: Notifications.data.docs,
            pagination_info: Notifications.data,
            is_notifications_loaded: true
        })
    }



    let tableNotificationHtml = ''
    if (!state.is_notifications_loaded) {
        tableNotificationHtml = <CommonSpinner />
    } else {

        // render table content
        tableNotificationHtml = state.notifications.map((item) => {

            return (
                <tr>
                    <td>
                        {item.notification_title}
                        <p>
                            <div dangerouslySetInnerHTML={{ __html: item.notification }} />
                        </p>
                    </td>
                    <td><Link to={`${siteUrls.NOTIFICATION_DETAIL_VIEW}/${item._id}`}>Oku <i className="fa fa-chevron-right"></i></Link></td>
                </tr>
            )
        })



    }


    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Bildirim</th>
                    <th>#</th>
                </thead>
                <tbody>
                    {tableNotificationHtml}
                </tbody>
            </table>
            <Pagination object={state.pagination_info} onClick={getNotifications} />

        </>
    )

}


export default TableNotification