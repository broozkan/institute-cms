import React, { Component } from 'react'
import getFormList from '../../data/FormData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'
import FormForm from '../Forms/Form'

class UpdateForm extends React.Component {

    constructor() {
        super()
    
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {

        // get user list
        await getFormList(this.props.match.params.formId, {}, (formData) => {
            this.setState(formData)
        })
    }


    // form submit
    handleSubmit = async (value) => {

        this.setState({
            is_submitting: true
        })


        const formData = value

        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/form/update/' + this.props.match.params.formId, { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Form düzenlendi',
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


    render() {

        let formFormContent = ""

        if (this.state) {
            formFormContent = <FormForm states={this.state} formSubmitFunction={this.handleSubmit} />
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

export default UpdateForm