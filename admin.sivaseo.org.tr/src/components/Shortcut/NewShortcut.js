import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import TableContentSpinner from '../Common/CommonSpinner'
import ShortcutForm from '../Forms/Shortcut'


class NewShortcut extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
    }



    // form submit
    handleSubmit = async ( value ) => {
        

//        const formData = value
        let formData = new FormData()
        await formData.append('file', value.shortcut_image)
        value.shortcut_image = value.shortcut_image.name
        await formData.append('data', JSON.stringify(value))
        
        await axios.post(process.env.REACT_APP_API_ENDPOINT+'/shortcut/new', formData ,{ headers: { 'content-type': 'multipart/form-data','auth-token': localStorage.getItem('auth-token') } })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Kısayol eklendi',
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


        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Yeni Kısayol Ekle
                                        <div className="page-title-subheading">
                                            Yazıların ait olacağı kısayoller ekleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/shortcut/list" className="btn btn-primary"> <span className="fa fa-list"></span> Kısayol Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Kısayol Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">

                                    <ShortcutForm states={this.state} formSubmitFunction={this.handleSubmit}/>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default NewShortcut