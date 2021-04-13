import React from 'react'
import FormLogin from '../../../../components/Site/Form/FormLogin'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'

const Login = () => {

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Giriş Yap"]} />

            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 offset-lg-2 offset-md-2">
                            <FormLogin />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login