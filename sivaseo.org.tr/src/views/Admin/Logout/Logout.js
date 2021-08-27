import React, { useContext, useEffect } from 'react'


const Logout = () => {

    useEffect(()=>{
        localStorage.clear()
    },[])

    return (
        <div id="page-content-wrapper">

            <div class="container-fluid page-inner-container">
                <div className="col-lg-12 mt-5 text-center">
                    <div class="row">
                        <div class="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="mt-5">Oturumunuz kapatılmıştır</h2>
                                    <a href="/admin/login" className="mt-5"><span className="fa fa-chevron-left"></span> Tekrar giriş yapın</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Logout