import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import LinkUpdateCloseExpirationMedicine from '../Link/LinkUpdateCloseExpirationMedicine'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'


const TableCloseExpirationMedicine = () => {

    const [state, setState] = useState({
        close_expirations: [],
        pagination_info: '',
        is_close_expirations_loaded: false,

    })


    useEffect(() => {
        getCloseExpirations()
    }, [])


    const getCloseExpirations = async (page = 1) => {
        setState({
            ...state,
            is_close_expirations_loaded: false
        })

        const closeExpirations = await api.get(`/close-expirations/${page}`, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            ...state,
            close_expirations: closeExpirations.data.docs,
            pagination_info: closeExpirations.data,
            is_close_expirations_loaded: true
        })
    }



    let tableCloseExpirationMedicineHtml = ''
    if (!state.is_close_expirations_loaded) {
        tableCloseExpirationMedicineHtml = <CommonSpinner />
    } else {
        const user = JSON.parse(localStorage.getItem('user'))

        // render table content
        tableCloseExpirationMedicineHtml = state.close_expirations.map((item) => {

            let updateButtonHtml = ''
            let deleteButtonHtml = ''
            if (user._id == item.close_expiration_user[0]._id) {
                updateButtonHtml = <Link to={`${siteUrls.UPDATE_CLOSE_EXPIRATION_VIEW}/${item._id}`} className="float-right"> <span className="fa fa-edit"></span> Düzenle</Link>
                deleteButtonHtml = <ButtonDelete model_name="close-expiration-medicine" _id={item._id} />

            }
            return (
                <tr>
                    <td className="close-expiration-medicine-image-cell"><img className="img img-fluid close-expiration-medicine-image" src={process.env.REACT_APP_API_ENDPOINT + '/file/' + item.close_expiration_image} /></td>
                    <td>{item.close_expiration_name}</td>
                    <td>{item.close_expiration_price}</td>
                    <td>{item.close_expiration_expiration_date}</td>
                    <td>{item.close_expiration_stock_piece}</td>
                    <td>
                        <span className="fa fa-user mr-2"></span>
                        {item.close_expiration_user[0].user_name}
                    </td>
                    <td>
                        {updateButtonHtml}
                        {deleteButtonHtml}
                    </td>
                </tr>
            )
        })



    }


    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <th>İlaç Görseli</th>
                        <th>İlaç Adı</th>
                        <th>Birim Fiyat</th>
                        <th>Miad</th>
                        <th>Adet</th>
                        <th>Eczane</th>
                        <th>#</th>
                    </thead>
                    <tbody>
                        {tableCloseExpirationMedicineHtml}
                    </tbody>
                </table>
            </div>

            <Pagination object={state.pagination_info} onClick={getCloseExpirations} />

        </>
    )

}


export default TableCloseExpirationMedicine