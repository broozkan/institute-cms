import React, { Component } from 'react'
import getCommentList from '../../data/CommentData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import CommentForm from '../Forms/Comment'


class updateComment extends React.Component {

    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async componentDidMount() {

        // get comment informations
        await getCommentList(this.props.match.params.commentId, {}, (commentData) => {
            
            this.setState(commentData)
        })

    }




    // form submit
    handleSubmit = async (value) => {


        const formData = value

        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/comment/update/' + this.props.match.params.commentId, { formData })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Yorum düzenlendi',
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
        let commentFormContent = ""

        if(this.state){
            commentFormContent = <CommentForm states={this.state} formSubmitFunction={this.handleSubmit}/>
        }
        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Yorumu Düzenle
                                        <div className="page-title-subheading">
                                            Yorumu düzenleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/comment/list" className="btn btn-primary"> <span className="fa fa-list"></span> Yorum Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Yorum Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    
                                    {commentFormContent}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default updateComment