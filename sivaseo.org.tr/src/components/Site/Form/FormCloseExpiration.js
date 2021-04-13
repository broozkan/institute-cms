import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'
import { Link } from 'react-router-dom'
import { siteUrls } from '../../../lib/Site/siteUrls'

const FormNewCloseExpiration = (props) => {

    const [state, setState] = useState({
        close_expiration_name: '',
        close_expiration_piece: '',
        close_expiration_mf_piece: '',
        close_expiration_stock_piece: '',
        close_expiration_price: '',
        close_expiration_expiration_date: '',
        close_expiration_image: '',
        is_submitting: false
    })


    useEffect(() => {
        if (props.close_expiration_id) {
            getCloseExpirationData()
        }
    }, [])


    const getCloseExpirationData = async () => {

        const closeExpirationData = await api.get('/close-expirations/1', { params: { '_id': props.close_expiration_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState(closeExpirationData.data.docs[0])
    }


    const handleOnChange = (e) => {

        if (e.target.type === "file") {
            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })

        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }

    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_submitting: true
        })

        let formData = new FormData()
        if (state.close_expiration_image) {
            await formData.append('file', state.close_expiration_image)
            state.close_expiration_image = state.close_expiration_image.name
        } else {
            state.close_expiration_image = "default.jpg"
        }


        await formData.append('data', JSON.stringify(state))

        let submitResponse = ''
        if (props.close_expiration_id) {
            submitResponse = await api.put('/close-expirations/' + props.close_expiration_id, formData, { headers: { 'content-type': 'multipart/form-data', 'auth-token': localStorage.getItem('dashboard-auth-token') } })
        } else {
            submitResponse = await api.post('/close-expirations', formData, { headers: { 'content-type': 'multipart/form-data', 'auth-token': localStorage.getItem('dashboard-auth-token') } })
        }


        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: 'Kaydedildi',
                icon: 'success'
            })
        } else {
            alert(submitResponse.data.responseData)
            Swal.fire({
                title: 'Hata!',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
        }

        setState({
            ...state,
            is_submitting: false
        })

    }

    return (

        <>
            <div className="section-title">
                <h2>Miadı Yakın İlaç Formu </h2>
            </div>
            <form id="form-new-close-expirations" className="fix mb-60 p-3" method="POST" onSubmit={handleOnSubmit}>
                <div className="form-group">
                    <label for="close_expiration_name">İlaç Adı</label>
                    <input className="form-control" name="close_expiration_name" onChange={handleOnChange} value={state.close_expiration_name} placeholder="İlaç adını giriniz" required type="text" />
                </div>
                <div className="form-group">
                    <label for="close_expiration_piece">İlaç Adedi</label>
                    <input className="form-control" name="close_expiration_piece" onChange={handleOnChange} value={state.close_expiration_piece} placeholder="İlaç mfsiz adedini giriniz" required type="number" />
                </div>
                <div className="form-group">
                    <label for="close_expiration_mf_piece">İlaç Mf Adedi</label>
                    <input className="form-control" name="close_expiration_mf_piece" onChange={handleOnChange} value={state.close_expiration_mf_piece} placeholder="İlaç mf adedini giriniz" required type="number" />
                </div>
                <div className="form-group">
                    <label for="close_expiration_stock_piece">İlaç Stok Adedi</label>
                    <input className="form-control" name="close_expiration_stock_piece" onChange={handleOnChange} value={state.close_expiration_stock_piece} placeholder="İlaç stok adedini giriniz" required type="number" />
                </div>
                <div className="form-group">
                    <label for="close_expiration_price">İlaç Fiyatı</label>
                    <input className="form-control" name="close_expiration_price" onChange={handleOnChange} value={state.close_expiration_price} placeholder="İlaç fiyatını giriniz" required type="number" step=".01" />
                </div>
                <div className="form-group">
                    <label for="close_expiration_expiration_date">İlaç Miadı</label>
                    <input className="form-control" name="close_expiration_expiration_date" onChange={handleOnChange} value={state.close_expiration_expiration_date} placeholder="İlaç mf adedini giriniz" required type="date" />
                </div>
                <div className="form-group">
                    <label for="close_expiration_image">İlaç Görseli</label>
                    <input className="form-control" name="close_expiration_image" onChange={handleOnChange} type="file" />
                </div>
                <div className="form-group float-right text-right">
                    <Link to={siteUrls.CLOSE_EXPIRATION_LIST_VIEW} className="btn btn-outline-secondary mx-4"> <span className="fa fa-arrow-left"></span> Geri</Link>
                    <button className="btn btn-danger" type="submit"> <span className="fa fa-save"></span> Kaydet</button>
                </div>
            </form>
        </>
    )
}


export default FormNewCloseExpiration