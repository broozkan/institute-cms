import React from 'react'
import axios from 'axios'
import getCategoryList from '../../data/CategoryData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'

class CategoryList extends React.Component {

    constructor() {
        super()

        this.state = {
            categories: [],
            isLoaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
    }


    deleteClick(categoryId) {

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen kategori geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, eminim!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/category/delete/' + categoryId)
                    .then(res => {
                        console.log(res);
                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Kategori silindi',
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
        await getCategoryList("", (data) => {
            this.setState({
                categories: data,
                isLoaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.isLoaded == false) {
            tableContent = <TableContentSpinner />
        } else {
            tableContent = this.state.categories.map((item) => {
                return (
                    <tr>
                        <td>{item.category_name}</td>
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
                                        Kategoriler
                                                <div className="page-title-subheading">
                                            Sistemdeki kullanıcıların listesi
                                                </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/category/new" className="btn btn-success"> <span className="fa fa-plus"></span> Yeni Kategori Ekle</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body"><h5 class="card-title">Kategoriler</h5>
                            <table className="table table-striped">
                                <thead>
                                    <th>Kategori Adı</th>
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

export default CategoryList