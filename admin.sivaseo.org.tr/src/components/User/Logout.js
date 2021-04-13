import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Logo from '../../images/logo.png'

class Logout extends React.Component {



    componentDidMount(){
        localStorage.clear()
    }



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

                                        </div>

                                        <div className="col-lg-2">
                                            <img src={Logo} className="img-fluid rounded float-right" />


                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div className="alert alert-success">
                                        <h4>Oturumunuz kapatıldı</h4>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <Link to="/user/login">Tekrar giriş yapın</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default Logout