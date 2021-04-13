import React from 'react'
import axios from 'axios'
import getSliderList from '../../data/SliderData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'

class SliderList extends React.Component {

    constructor() {
        super()

        this.state = {
            sliders: [],
            isLoaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
    }


    deleteClick(sliderId) {

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen kısayol geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, eminim!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/slider/delete/' + sliderId)
                    .then(res => {
                        console.log(res);
                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Slider silindi',
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
        await getSliderList("", (data) => {
            this.setState({
                sliders: data,
                isLoaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.isLoaded == false) {
            tableContent = <TableContentSpinner />
        } else {
            tableContent = this.state.sliders.map((item) => {
                return (
                    <tr>
                        <td>{item.slider_name}</td>
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
                                        Sliderlar
                                        <div className="page-title-subheading">
                                            Sliderlar listesi
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/slider/new" className="btn btn-success"> <span className="fa fa-plus"></span> Yeni Slider Ekle</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body"><h5 class="card-title">Sliderlar</h5>
                            <table className="table table-striped">
                                <thead>
                                    <th>Slider Adı</th>
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

export default SliderList