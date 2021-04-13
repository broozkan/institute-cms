import React, { useEffect, useState } from 'react'
import api from '../../../services/api'

const FormContact = () => {

    const [state, setState] = useState({
        contact_form: '',
        is_contact_form_loaded: false
    })


    useEffect(() => {
        getFormData()
    }, [])


    const getFormData = async () => {
        const formData = await api.get(
            '/form/list',
            {
                headers: { "auth-token": localStorage.getItem('auth-token') },
                params: { "form_name": "İletişim Formu" }
            }
        )
        setState({
            ...state,
            contact_form: formData.data[0],
            is_contact_form_loaded: true
        })
    }



    // render contact form
    let contactFormHtml = ""
    if (!state.is_contact_form_loaded) {
        contactFormHtml = <span className="fa fa-spin fa-spinner fa-3x text-center"></span>
    } else {
        contactFormHtml = state.contact_form.form_content.map((item) => {

            switch (item.form_content_element_type_name) {
                case 'input[type=text]':
                    return (
                        <div class="form-group input-box">
                            <label for={item.form_content_element_label}>{item.form_content_element_label}</label>
                            <input required="" placeholder={item.form_content_element_label} name={item.form_content_element_label} id={item.form_content_element_label} type="text" value="" />
                        </div>
                    )
                default:
                    return ''
            }

        })
    }

    return (
        <>
            <div className="section-title">
                <h2>{state.contact_form.form_name} </h2>
            </div>

            <form action="" className="fix mb-60 p-3" id="contact-form" method="POST">

                <div className="row">
                    {contactFormHtml}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-danger">Gönder</button>

                </div>
            </form>
        </>
    )

}

export default FormContact