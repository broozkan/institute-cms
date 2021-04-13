import React from 'react'
import axios from 'axios'
import getFeedbackList from '../../data/FeedbackData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'
import serialize from 'form-serialize'

class FeedbackList extends React.Component {

    constructor() {
        super()

        this.state = {
            feedbacks: [],
            isLoaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    // form material on change event
    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    // form materials on change event end


    deleteClick(feedbackId) {

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen geribildirim geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, eminim!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/feedback/delete/' + feedbackId)
                    .then(res => {
                        console.log(res);
                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Feedback silindi',
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
        
        await getFeedbackList("", this.state.filters, (data) => {
            this.setState({
                feedbacks: data,
                isLoaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.isLoaded == false) {
            tableContent = <TableContentSpinner />
        } else {
            tableContent = this.state.feedbacks.map((item) => {
                return (
                    <tr>
                        <td>{item.feedback}</td>
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
                                        Geri Bildirimler
                                        <div className="page-title-subheading">
                                            Geri bildirim listesi
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <th>Geri Bildirim</th>
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

export default FeedbackList