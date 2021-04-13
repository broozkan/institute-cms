import React, { Component } from 'react'
import getCloseExpirationMedicineList from '../../data/CloseExpirationMedicineData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'
import CloseExpirationMedicineForm from '../Forms/CloseExpirationMedicine'

class UpdateCloseExpirationMedicine extends React.Component {

    constructor() {
        super()
        this.state = {
            close_expiration_medicine_name: "",
            close_expiration_medicine_piece: "",
            close_expiration_medicine_mf_piece: "",
            close_expiration_medicine_expiration_date: "",
            close_expiration_medicine_image: '',
            is_submitting: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {

        // get user list
        await getCloseExpirationMedicineList(this.props.match.params.closeExpirationMedicineId, (closeExpirationMedicineData) => {

            this.setState(closeExpirationMedicineData)
        })
    }


    // form submit
    handleSubmit = async (value) => {

        this.setState({
            is_submitting: true
        })


        let formData = new FormData()
        console.log(value);
        await formData.append('file', value.close_expiration_medicine_image)
        value.close_expiration_medicine_image = value.close_expiration_medicine_image.name
        await formData.append('data', JSON.stringify(value))
        
        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/close-expiration-medicine/update/'+this.props.match.params.closeExpirationMedicineId, formData ,{ headers: { 'content-type': 'multipart/form-data','auth-token': localStorage.getItem('auth-token') } })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Miadı Yakın İlaç düzenlendi',
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

        let closeExpirationMedicineFormContent = ""

        if (this.state.close_expiration_medicine_name != '') {
            closeExpirationMedicineFormContent = <CloseExpirationMedicineForm states={this.state} formSubmitFunction={this.handleSubmit} />
        }


        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Miadı Yakın İlacı Düzenle
                                        <div className="page-title-subheading">
                                            Miadı yakın ilacı düzenleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/close-expiration-medicine/list" className="btn btn-primary"> <span className="fa fa-list"></span> Miadı Yakın İlaç Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Miadı Yakın İlaç Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">

                                    {closeExpirationMedicineFormContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default UpdateCloseExpirationMedicine