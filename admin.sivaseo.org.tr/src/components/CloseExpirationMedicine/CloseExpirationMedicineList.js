import React from 'react'
import axios from 'axios'
import getCloseExpirationMedicineList from '../../data/CloseExpirationMedicineData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import CommonSpinner from '../Common/CommonSpinner'

class CloseExpirationMedicineList extends React.Component {

    constructor() {
        super()

        this.state = {
            close_expiration_medicines: [],
            is_close_expiration_medicines_loaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
    }


    deleteClick(closeExpirationMedicineId) {

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen miadı yakın ilaç geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, eminim!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/close-expiration-medicine/delete/' + closeExpirationMedicineId)
                    .then(res => {
                        console.log(res);
                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Miadı Yakın İlaç silindi',
                                icon: 'success',
                                confirmButtonText: 'Geri'
                            })
                            this.componentDidMount()
                        } else {
                            Swal.fire({
                                title: 'Hata!',
                                text: res.data.responseData,
                                icon: 'error',
                                confirmButtonText: 'Geri'
                            })
                        }
                    })


            }
        })

    }

    async componentDidMount() {
        await getCloseExpirationMedicineList("", (data) => {
            this.setState({
                close_expiration_medicines: data,
                is_close_expiration_medicines_loaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.is_close_expiration_medicines_loaded == false) {
            tableContent = <CommonSpinner />
        } else {
            tableContent = this.state.close_expiration_medicines.map((item) => {
                return (
                    <tr>
                        <td>{item.close_expiration_medicine_name}</td>
                        <td><Link to={'update/' + item._id}>Düzenle</Link> <a href='javascript:void(0);' onClick={() => this.deleteClick(item._id)}> Sil </a> </td>
                    </tr>
                )

            })
        }


        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Miadı Yakın İlaçlar
                                        <div className="page-title-subheading">
                                            Miadı Yakın İlaçlar listesi
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/close-expiration-medicine/new" className="btn btn-success"> <span className="fa fa-plus"></span> Yeni Miadı Yakın İlaç Ekle</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body"><h5 class="card-title">Miadı Yakın İlaçlar</h5>
                            <table className="table table-striped">
                                <thead>
                                    <th>Miadı Yakın İlaç Adı</th>
                                    <th>İşlem</th>
                                </thead>
                                <tbody>
                                    {tableContent}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default CloseExpirationMedicineList