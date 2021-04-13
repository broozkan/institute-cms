import React from 'react'
import axios from 'axios'
import getPostList from '../../data/PostData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'
import { Redirect } from 'react-router-dom'

class PostList extends React.Component {

    constructor() {
        super()

        this.state = {
            posts: [],
            isLoaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
    }


    deleteClick(postId) {

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen yazı geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, eminim!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/post/delete/' + postId,
                {
                    headers: {
                        "auth-token": localStorage.getItem('auth-token')
                    }
                })
                    .then(res => {

                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Yazı silindi',
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
        await getPostList("", {},(data) => {
            this.setState({
                posts: data,
                isLoaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.isLoaded == false) {
            tableContent = <TableContentSpinner />
        } else {
            tableContent = this.state.posts.map((item) => {
                return (
                    <tr>
                        <td>{item.post_title}</td>
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
                                        Yazıler
                                                <div className="page-title-subheading">
                                            Sistemdeki kullanıcıların listesi
                                                </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/post/new" className="btn btn-success"> <span className="fa fa-plus"></span> Yeni Yazı Ekle</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body"><h5 class="card-title">Yazıler</h5>
                            <table className="table table-striped">
                                <thead>
                                    <th>Yazı</th>
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

export default PostList