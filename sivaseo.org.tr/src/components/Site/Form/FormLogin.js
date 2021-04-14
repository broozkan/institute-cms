import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import { siteUrls } from '../../../lib/Site/siteUrls'
import api from '../../../services/api'

const FormLogin = () => {

    const [state, setState] = useState({
        user_username: '',
        user_password: ''
    })

    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const formData = state
        const loginResponse = await api.post('/users/login/', {}, { auth: { username: state.user_username, password: state.user_password } })
        console.log(loginResponse);
        if (loginResponse.data.response) {
            localStorage.setItem('dashboard-auth-token', loginResponse.data.token)
            console.log(loginResponse.data.responseData[0]);
            localStorage.setItem('user', JSON.stringify(loginResponse.data.responseData[0]))
            console.log(JSON.parse(localStorage.getItem('user')));
            Swal.fire({
                title: 'Başarılı!',
                text: "Yönlendiriliyorsunuz...",
                icon: 'success'
            })
            window.location.href = siteUrls.USER_DASHBOARD_VIEW
        } else {
            Swal.fire({
                title: 'Hata!',
                text: loginResponse.data.responseData,
                icon: 'error'
            })
        }
    }

    return (
        <>
            <div className="section-title">
                <h2>Giriş Yapın </h2>
            </div>

            <form action="" className="fix mb-60 p-3" id="contact-form" method="POST" onSubmit={handleOnSubmit}>

                <div className="row">
                    <div className="form-group">
                        <label>Kullanıcı Adınız</label>
                        <input className="form-control" name="user_username" value={state.user_username} onChange={handleOnChange} placeholder="Kullanıcı adınızı giriniz" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Parolanız</label>
                        <input className="form-control" name="user_password" value={state.user_password} onChange={handleOnChange} placeholder="Parolanızı giriniz" type="password" />
                    </div>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-danger">Giriş Yap</button>
                </div>
            </form>
        </>
    )

}

export default FormLogin
