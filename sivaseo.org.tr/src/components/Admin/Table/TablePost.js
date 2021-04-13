import React, { useEffect, useState } from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import LinkUpdate from '../Link/LinkUpdate'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'


const TablePost = () => {

    const [state, setState] = useState({
        posts: [],
        pagination_info: '',
        is_posts_loaded: false,

    })


    useEffect(() => {
        getPosts()
    }, [])


    const getPosts = async (page = 1) => {
        setState({
            ...state,
            is_posts_loaded: false
        })

        const posts = await api.get('/posts/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            ...state,
            posts: posts.data.docs,
            pagination_info: posts.data,
            is_posts_loaded: true
        })
    }



    let tablePostHtml = ''
    if (!state.is_posts_loaded) {
        tablePostHtml = <CommonSpinner />
    } else {
        const user = JSON.parse(localStorage.getItem('user'))

        // render table content
        tablePostHtml = state.posts.map((item) => {


            return (
                <tr>
                    <td>{item.post_title}</td>
                    <td>{item.post_author}</td>
                    <td>{item.post_publish_date}</td>
                    <td>
                        <a href={`${adminUrls.UPDATE_POST_VIEW}/${item._id}`}> <span className="fa fa-edit"></span> Düzenle</a>
                        <ButtonDelete model_name="post" _id={item._id} />
                    </td>
                </tr>
            )
        })



    }


    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Yazı</th>
                    <th>Yazar</th>
                    <th>Yay. Tarihi</th>
                    <th>#</th>
                </thead>
                <tbody>
                    {tablePostHtml}
                </tbody>
            </table>
            <Pagination object={state.pagination_info} onClick={getPosts} />

        </>
    )

}


export default TablePost