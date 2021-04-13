import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import LoginForm from '../Forms/Login'
import Logo from '../Common/Logo'

class Login extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        console.log(process.env.REACT_APP_API_ENDPOINT);
    }


    // form submit
    handleSubmit = async (value) => {


        const formData = value
        console.log(process.env.REACT_APP_API_ENDPOINT);
        await axios.post(process.env.REACT_APP_API_ENDPOINT+'/user/login', { formData })
            .then(res => {
                if (res.data.response == true) {
                    localStorage.setItem('auth-token', res.data.token)
                    Swal.fire({
                        title: 'Giriş Başarılı!',
                        text: 'Yönlendiriliyorsunuz...',
                        icon: 'success',
                        showConfirmButton: false
                    })

                    localStorage.setItem('user', JSON.stringify(res.data.responseData[0]))
                    if(window.location.pathname == '/user/login' || window.location.pathname == '/user/login/'){
                        window.location.href=res.data.responseData[0].user_redirect_url
                    }else{
                        window.location.reload()
                    }
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
                                            <h4>Giriş Yapın</h4>

                                        </div>

                                        <div className="col-lg-2">
                                            <Logo />
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">

                                    <LoginForm states={this.state} formSubmitFunction={this.handleSubmit} />

                                </div>
                                <div className="card-footer">
                                    <Link to="/user/forget-password">Parolanızı mı unuttunuz?</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default Login