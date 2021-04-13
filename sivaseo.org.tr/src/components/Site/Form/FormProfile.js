import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'

const FormProfile = () => {

    const [state, setState] = useState({
        is_submitting: false
    })


    useEffect(() => {
        getUserData()
    }, [])


    const getUserData = async () => {
        const user = JSON.parse(localStorage.getItem('user'))

        const formData = await api.get(
            '/user/list',
            {
                headers: { "auth-token": localStorage.getItem('auth-token') },
                params: { "_id": user._id }
            }
        )
        setState(formData.data[0])
    }


    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        setState({
            ...state,
            is_submitting: true
        })

        const user = JSON.parse(localStorage.getItem('user'))
        
        const formData = state

        const submitResponse = await api.put('/user/update/'+user._id, {formData})
        
        if(submitResponse.data.response){
            Swal.fire({
                title:'Başarılı!',
                text:'Profil bilgileriniz düzenlendi!',
                icon:'success'
            })
        }else{
            Swal.fire({
                title:'Hata!',
                text: submitResponse.data.responseData,
                icon:'error'
            })
        }
    }

    return (
        <>
            

            <div className="section-title">
                <h2>Profilinizi Düzenleyin </h2>
            </div>

            <form action="" className="fix mb-60 p-3" onSubmit={handleOnSubmit} id="contact-form" method="POST">

                <div className="row">
                    <div className="form-group">
                        <label>Kullanıcı Adınız</label>
                        <input className="form-control" onChange={handleOnChange} name="user_username" value={state.user_username} placeholder="Kullanıcı adınızı giriniz" type="text" />
                    </div>
                    <div className="form-group">
                        <label>Parolanız</label>
                        <input className="form-control" onChange={handleOnChange} name="user_password" required value={state.user_password} placeholder="Parolanızı giriniz" type="password" />
                    </div>
                    <div className="form-group">
                        <label>Parolanız (Tekrar)</label>
                        <input className="form-control" onChange={handleOnChange} name="user_password_repeat" required value={state.user_password_repeat} placeholder="Parolanızı giriniz" type="password" />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger" type="submit">Kaydet</button>                        
                    </div>
                </div>
            </form>
        </>
    )

}

export default FormProfile