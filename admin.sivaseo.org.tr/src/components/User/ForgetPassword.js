import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ForgetPasswordForm from '../Forms/ForgetPassword'
import Logo from '../Common/Logo'

class ForgetPassword extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    // form submit
    handleSubmit = async (value) => {


        const formData = value

        await axios.post(process.env.REACT_APP_API_ENDPOINT+'/user/forget-password', { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Parola sıfırlama bağlantısı e-posta adresinize gönderilmiştir.',
                        icon: 'success',
                        showConfirmButton: false
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

        this.setState({
            is_submitting: false
        })
    }
    // form submit end



    render() {

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">



                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 offset-lg-4">
                            <div className="main-card mb-3 card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-lg-10 pt-2">
                                            <h4>Parolanızı sıfırlayın</h4>

                                        </div>

                                        <div className="col-lg-2">
                                            <Logo />


                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">

                                    <ForgetPasswordForm states={this.state} formSubmitFunction={this.handleSubmit} />

                                </div>
                                <div className="card-footer">
                                    <Link to="/user/login">Giriş ekranına dön</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default ForgetPassword