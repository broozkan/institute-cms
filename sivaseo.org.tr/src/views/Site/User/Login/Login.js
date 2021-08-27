import React from 'react'
import FormLogin from '../../../../components/Site/Form/FormLogin'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import queryString from 'query-string'

const Login = (props) => {

    const urlParams = queryString.parse(props.location.search);




    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Giriş Yap"]} />

            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 offset-lg-2 offset-md-2">
                            <FormLogin re={urlParams.re} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login