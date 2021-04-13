import React, { Component } from 'react'
import getPostList from '../../data/PostData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import PostForm from '../Forms/Post'


class updatePost extends React.Component {

    constructor() {
        super()

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    async componentDidMount() {

        // get post informations
        await getPostList(this.props.match.params.postId, {}, (postData) => {
            this.setState(postData)
        })

    }




    // form submit
    handleSubmit = async (value) => {


        let formData = new FormData()
        await formData.append('file', value.post_image)
        value.post_image = value.post_image.name
        await formData.append('data', JSON.stringify(value))

        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/post/update/' + this.props.match.params.postId, 
        formData,
        { 
            headers: 
            { 
                'content-type': 'multipart/form-data',
                'auth-token': localStorage.getItem('auth-token') 
            } 
        })
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Yazı düzenlendi',
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
        let postFormContent = ""

        if(this.state){
            postFormContent = <PostForm states={this.state} formSubmitFunction={this.handleSubmit}/>
        }
        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Yazıyu Düzenle
                                        <div className="page-title-subheading">
                                            Yazıyu düzenleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/post/list" className="btn btn-primary"> <span className="fa fa-list"></span> Yazı Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Yazı Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    
                                    {postFormContent}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default updatePost