import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import api from '../../../../services/api'

const Logout = () => {

    const [state, setState] = useState({
        is_user_logged_out : false
    })


    useEffect(()=>{
        logout()
    },[])

    const logout = async () => {
        await localStorage.clear()
        setState({
            is_user_logged_out: true
        })

        window.location.href='/'
    }

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Oturumu Kapat"]} />

            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h3>Oturumunuz kapatılmıştır.</h3>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Logout