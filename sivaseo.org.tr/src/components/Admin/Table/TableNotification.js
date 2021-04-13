import React, { useEffect, useState } from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import LinkUpdate from '../Link/LinkUpdate'
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

        const notifications = await api.get('/notifications/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            ...state,
            notifications: notifications.data.docs,
            pagination_info: notifications.data,
            is_notifications_loaded: true
        })
    }



    let tableNotificationHtml = ''
    if (!state.is_notifications_loaded) {
        tableNotificationHtml = <CommonSpinner />
    } else {
        const user = JSON.parse(localStorage.getItem('user'))

        // render table content
        tableNotificationHtml = state.notifications.map((item) => {


            return (
                <tr>
                    <td>{item.notification_title}</td>
                    <td>{item.notification_publish_date}</td>
                    <td>
                        <a href={`${adminUrls.UPDATE_NOTIFICATION_VIEW}/${item._id}`}> <span className="fa fa-edit"></span> Düzenle</a>
                        <ButtonDelete model_name="notification" _id={item._id} />
                    </td>
                </tr>
            )
        })



    }


    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Bildirim Başlığı</th>
                    <th>Yay. Tarihi</th>
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