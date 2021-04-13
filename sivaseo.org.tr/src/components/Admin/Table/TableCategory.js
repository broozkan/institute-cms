import React, { useEffect, useState } from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import LinkUpdate from '../Link/LinkUpdate'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'


const TableCategory = () => {

    const [state, setState] = useState({
        categories: [],
        pagination_info: '',
        is_categories_loaded: false,

    })


    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async (page = 1) => {
        setState({
            ...state,
            is_categories_loaded: false
        })

        const categories = await api.get('/categories/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            ...state,
            categories: categories.data.docs,
            pagination_info: categories.data,
            is_categories_loaded: true
        })
    }



    let tableCategoryHtml = ''
    if (!state.is_categories_loaded) {
        tableCategoryHtml = <CommonSpinner />
    } else {
        const user = JSON.parse(localStorage.getItem('user'))

        // render table content
        tableCategoryHtml = state.categories.map((item) => {


            return (
                <tr>
                    <td>{item.category_name}</td>
                    <td>
                        <a href={`${adminUrls.UPDATE_CATEGORY_VIEW}/${item._id}`}> <span className="fa fa-edit"></span> Düzenle</a>
                        <ButtonDelete model_name="categories" _id={item._id} />
                    </td>
                </tr>
            )
        })



    }


    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Kategori</th>
                    <th>#</th>
                </thead>
                <tbody>
                    {tableCategoryHtml}
                </tbody>
            </table>
            <Pagination object={state.pagination_info} onClick={getCategories} />

        </>
    )

}


export default TableCategory