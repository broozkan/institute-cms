import React, { useEffect, useState } from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import LinkUpdate from '../Link/LinkUpdate'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'


const TableUser = () => {

    const [state, setState] = useState({
        users: [],
        pagination_info: '',
        is_users_loaded: false,

    })


    useEffect(() => {
        getUsers()
    }, [])


    const getUsers = async (page = 1) => {
        setState({
            ...state,
            is_users_loaded: false
        })

        const users = await api.get('/users/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            ...state,
            users: users.data.docs,
            pagination_info: users.data,
            is_users_loaded: true
        })
    }



    let tableUserHtml = ''
    if (!state.is_users_loaded) {
        tableUserHtml = <CommonSpinner />
    } else {
        const user = JSON.parse(localStorage.getItem('user'))

        // render table content
        tableUserHtml = state.users.map((item) => {


            return (
                <tr>
                    <td>{item.user_name}</td>
                    <td>
                        <ButtonDelete model_name="users" _id={item._id} />
                    </td>
                </tr>
            )
        })



    }


    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Kullanıcı</th>
                    <th>#</th>
                </thead>
                <tbody>
                    {tableUserHtml}
                </tbody>
            </table>
            <Pagination object={state.pagination_info} onClick={getUsers} />

        </>
    )

}


export default TableUser