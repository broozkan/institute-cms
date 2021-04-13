import React, { useContext } from 'react'
import FormLogin from '../../../components/Admin/Form/FormLogin'
import { UserContextWrapper } from '../../../contexts/Admin/UserContext'


const Login = () => {

    return (
        <div id="page-content-wrapper">

            <div class="container-fluid page-inner-container">
                <div className="col-lg-4 offset-lg-4">
                    <div className="page-title">
                        <h4>Giriş Yapın</h4>
                        <p>Site içeriğini düzenleyebildiğiniz panele giriş yapın</p>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <FormLogin />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login