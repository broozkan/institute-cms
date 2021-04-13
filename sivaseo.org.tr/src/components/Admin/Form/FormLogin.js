import React, { useEffect, useState, useContext } from 'react'
import api from '../../../services/api'
import CommonSpinner from '../../Admin/Spinner/CommonSpinner'
import Swal from 'sweetalert2'
import { adminUrls } from '../../../lib/Admin/adminUrls'

const FormLogin = () => {



    const [state, setState] = useState({
        user_username: "",
        user_password: "",
        remember_me: false,
        is_submitting: false
    })


    useEffect(() => {

    }, [])

    const handleOnChange = (e) => {
        if (e.target.type === "checkbox") {
            setState({
                ...state,
                [e.target.name]: e.target.checked,
            })
        } else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }
    }


    const handleSubmit = async (e) => {
        setState({
            ...state,
            is_submitting: true
        })


        e.preventDefault()

        const loginResponse = await api.post('/users/login/', {}, { auth: { username: state.user_username, password: state.user_password } })

        setState({
            ...state,
            is_submitting: false
        })

        if (loginResponse.data.response) {


            localStorage.setItem('auth-token', loginResponse.data.token)

            localStorage.setItem('user', JSON.stringify(loginResponse.data.responseData[0]))

            Swal.fire({
                title: 'Başarılı!',
                text: "Yönlendiriliyorsunuz...",
                icon: 'success'
            })
            window.location.href = adminUrls.POST_LIST_VIEW
        } else {
            Swal.fire({
                title: 'Hata!',
                text: loginResponse.data.responseData,
                icon: 'error'
            })
        }
    }


    let btnSaveInnerText = ''
    if (state.is_submitting == true) {
        btnSaveInnerText = <CommonSpinner />
    } else {
        btnSaveInnerText = 'Giriş Yap'
    }

    return (
        <form className="" onSubmit={handleSubmit}>
            <div className="position-relative row form-group">
                <label for="user_username" className="col-sm-4 col-form-label">Kullanıcı Adı</label>
                <div className="col-sm-8">
                    <input name="user_username" id="user_username" value={state.user_username} onChange={handleOnChange} required placeholder="Kullanıcı Adınız" type="text" className="form-control" />
                </div>
            </div>
            <div className="position-relative row form-group">
                <label for="user_password" className="col-sm-4 col-form-label">Parola</label>
                <div className="col-sm-8">
                    <input name="user_password" id="user_password" value={state.user_password} onChange={handleOnChange} required placeholder="Parolanız" type="password" className="form-control" />
                </div>
            </div>

            <div className="position-relative form-check">
                <input name="remember_me" id="remember_me" type="checkbox" checked={state.remember_me} onChange={handleOnChange} className="form-check-input" />
                <label for="remember_me" className="form-check-label">Beni Hatırla</label>
            </div>
            <div className="position-relative form-group  text-right">
                <button className="btn btn-primary mt-4 w-100" type="submit"> {btnSaveInnerText} </button>
            </div>


        </form>
    )

}

export default FormLogin