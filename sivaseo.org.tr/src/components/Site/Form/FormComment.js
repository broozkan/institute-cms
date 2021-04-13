import React, { Component, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const FormComment = (props) => {


    const [state, setState] = useState({
        comment_sender_name: '',
        comment_sender_email: '',
        comment_parent_comment_id: '',
        comment_post_id: props.post_id,
        comment_verification: '',
        comment: '',
        is_submitting: false
    })




    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setState({
            ...state,
            is_submitting: true
        })

        let formData = state

        await axios.post(process.env.REACT_APP_API_ENDPOINT + '/comment/new/', { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Yorumunuz alındı. Onay verildikten sonra gönderi altında sergilenecektir.',
                        icon: 'success',
                        confirmButtonText: 'Geri'
                    })
                } else {
                    Swal.fire({
                        title: 'Hata!',
                        text: res.data.responseData,
                        icon: 'error',
                        confirmButtonText: 'Geri'
                    })
                }

            })

        setState({
            is_submitting: false
           
        })
    }


    const handleOnChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }


    let submitButtonHtml = ""
    if (state.is_submitting) {
        submitButtonHtml = <span className="fa fa-spin fa-spinner"></span>

    } else {
        submitButtonHtml = "Gönder"
    }

    return (
        <>
            <div class="leave-comment mt-70">
                <div class="border-b mb-15">
                    <h5 class="text-uppercase">Yorum Yapın</h5>
                    <div className="alert alert-danger">
                        Yorum yaparken lütfen topluluk kurallarını göz önünde bulundurunuz!
                        </div>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div class="input-box">
                        <label>Adınız <span class="required">*</span></label>
                        <input value="" name="comment_sender_name" value={state.comment_sender_name} onChange={handleOnChange} id="comment_sender_name" type="text" />
                    </div>
                    <div class="input-box">
                        <label>E-Posta Adresiniz <span class="required">*</span></label>
                        <input value="" name="comment_sender_email" value={state.comment_sender_email} onChange={handleOnChange} id="comment_sender_email" type="email" />
                    </div>
                    <div class="input-box">
                        <label>Yorumunuz  <span class="required">*</span></label>
                        <textarea rows="8" cols="45" name="comment" value={state.comment} onChange={handleOnChange} id="comment"></textarea>
                    </div>
                    <div class="input-box">
                        <button type="submit" class="btn-one2 text-uppercase">{submitButtonHtml}</button>
                    </div>
                </form>
            </div>
        </>
    )


}

export default FormComment