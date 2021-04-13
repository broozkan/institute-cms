import React, { Component } from 'react'
import getFeedbackList from '../../data/FeedbackData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import FeedbackForm from '../Forms/Feedback'


class updateFeedback extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async componentDidMount() {

        // get feedback informations
        await getFeedbackList(this.props.match.params.feedbackId, {}, (feedbackData) => {
            
            this.setState(feedbackData)
        })

    }




    // form submit
    handleSubmit = async (value) => {


        const formData = value

        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/feedback/update/' + this.props.match.params.feedbackId, { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Geri bildirim düzenlendi',
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
        let feedbackFormContent = ""

        if(this.state){
            feedbackFormContent = <FeedbackForm states={this.state} formSubmitFunction={this.handleSubmit}/>
        }
        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Geri Bildirimi Düzenle
                                        <div className="page-title-subheading">
                                            Geri bildirimi düzenleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/feedback/list" className="btn btn-primary"> <span className="fa fa-list"></span> Geri Bildirim Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Geri Bildirim Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    
                                    {feedbackFormContent}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default updateFeedback