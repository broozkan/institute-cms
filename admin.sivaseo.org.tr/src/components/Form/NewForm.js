import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import TableContentSpinner from '../Common/CommonSpinner'
import FormForm from '../Forms/Form'


class NewForm extends React.Component {

    constructor() {
        super()

        this.state = {
            form_name: "",
            form_content: [],
            is_submitting: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)



    }









    // form submit
    handleSubmit = async ( value ) => {
        
        console.log(value);
        const formData = value

        await axios.post(process.env.REACT_APP_API_ENDPOINT+'/form/new', { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Form eklendi',
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

        this.setState({
            is_submitting: false
        })
    }
    // form submit end



    render() {

        let formFormContent = ""

        if(this.state){
            formFormContent = <FormForm states={this.state} formSubmitFunction={this.handleSubmit}/>
        }

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Yeni Form Ekle
                                        <div className="page-title-subheading">
                                            Yazıların ait olacağı kategoriler ekleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/form/list" className="btn btn-primary"> <span className="fa fa-list"></span> Form Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Form Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">

                                    {formFormContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default NewForm