import React from 'react'
import axios from 'axios'
import getCommentList from '../../data/CommentData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'
import serialize from 'form-serialize'

class CommentList extends React.Component {

    constructor() {
        super()

        this.state = {
            comments: [],
            filters: {},
            isLoaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
        this.handleFilterSubmit = this.handleFilterSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    // form material on change event
    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // form materials on change event end


    deleteClick(commentId) {

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
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/comment/delete/' + commentId)
                    .then(res => {
                        console.log(res);
                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Comment silindi',
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


    async handleFilterSubmit(e){
        e.preventDefault()
        
        const formFilter = await serialize(e.target, {hash: true, empty: true});

        this.setState({
            filters: formFilter
        })
        
        this.componentDidMount()
    }

    async componentDidMount() {
        
        await getCommentList("", this.state.filters, (data) => {
            this.setState({
                comments: data,
                isLoaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.isLoaded == false) {
            tableContent = <TableContentSpinner />
        } else {
            tableContent = this.state.comments.map((item) => {
                return (
                    <tr>
                        <td>{item.comment}</td>
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
                                        Yorumlar
                                        <div className="page-title-subheading">
                                            Yorumlar listesi
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="main-card mb-3 card">
                        <div className="card-header">
                            <div className="col-lg-12">
                                <form class="form-inline" onSubmit={this.handleFilterSubmit}>
                                    <div class="mb-2 mr-sm-2 mb-sm-0 position-relative form-group">
                                        <select className="form-control" name="comment_verification" onChange={this.handleOnChange} value={this.state.comment_verification}>
                                            <option value="*">Tümü</option>
                                            <option value="0">Onaylanmamış</option>
                                            <option value="1">Onaylanmış</option>
                                        </select>
                                    </div>
                                    <button class="btn btn-primary"> <span className="fa fa-filter"></span> Filtrele</button>
                                </form>
                            </div>
                        </div>
                        <div class="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <th>Yorum Adı</th>
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

export default CommentList