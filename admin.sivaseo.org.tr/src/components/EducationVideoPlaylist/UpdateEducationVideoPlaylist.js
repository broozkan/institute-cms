import React, { Component } from 'react'
import getEducationVideoPlaylistList from '../../data/EducationVideoPlaylistData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import EducationVideoPlaylistForm from '../Forms/EducationVideoPlaylist'

class UpdateEducationVideoPlaylist extends React.Component {

    constructor() {
        super()

        this.state = {
            education_video_playlist_name: "",
            education_video_playlist_image: "",
            is_education_video_playlist_private: true,
            is_submitting: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        // get user list
        await getEducationVideoPlaylistList(this.props.match.params.educationVideoPlaylistId, (educationVideoPlaylistData) => {
            this.setState(educationVideoPlaylistData)
        })
    }


    // form submit
    handleSubmit = async (value) => {

        this.setState({
            is_submitting: true
        })


        const formData = value

        await axios.put(process.env.REACT_APP_API_ENDPOINT+'/education-video-playlist/update/' + this.props.match.params.educationVideoPlaylistId, {formData}, {headers: {'auth-token':localStorage.getItem('auth-token')}} )
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Eğitim Videosu Listesi düzenlendi',
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
        let educationVideoContentHtml = ""

        if (this.state.education_video_playlist_name != "") {
            educationVideoContentHtml = <EducationVideoPlaylistForm states={this.state} formSubmitFunction={this.handleSubmit} />
        }

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Eğitim Videosu Listesini Düzenle
                                        <div className="page-title-subheading">
                                            Yazıların ait olacağı kategoriler ekleyin
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/category/list" className="btn btn-primary"> <span className="fa fa-list"></span> Kategori Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Kategori Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">

                                    {educationVideoContentHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default UpdateEducationVideoPlaylist