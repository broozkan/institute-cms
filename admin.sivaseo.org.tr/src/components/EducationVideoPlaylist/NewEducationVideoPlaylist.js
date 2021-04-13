import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import TableContentSpinner from '../Common/CommonSpinner'
import EducationVideoPlaylistForm from '../Forms/EducationVideoPlaylist'


class NewEducationVideoPlaylist extends React.Component {

    constructor() {
        super()

        this.state = {
            education_video_playlist_name: "",
            education_video_playlist_url: "",
            is_education_video_playlist_private: true,
            is_submitting: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)



    }



    // form submit
    handleSubmit = async ( value ) => {
        
        const formData = value

        await axios.post(process.env.REACT_APP_API_ENDPOINT+'/education-video-playlist/new', {formData} , {headers: {'auth-token':localStorage.getItem('auth-token')}})
            .then(res => {
                if (res.data.response == true) {
                    Swal.fire({
                        title: 'Başarılı!',
                        text: 'Eğitim Videosu Serisi eklendi',
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
    // form submit end



    render() {

        let educationVideoPlaylistFormContent = ""

        if(this.state){
            educationVideoPlaylistFormContent = <EducationVideoPlaylistForm states={this.state} formSubmitFunction={this.handleSubmit}/>
        }

        return (
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <div className="app-page-title">
                        <div className="page-title-wrapper">
                            <div className="page-title-heading">
                                <div className="row">
                                    <div className="col-lg-12">
                                        Yeni Eğitim Videoları Listesi Ekle
                                        <div className="page-title-subheading">
                                            Sistem kullanıcıları için videolardan bir liste hazırlayın
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/education-video-playlist/list" className="btn btn-primary"> <span className="fa fa-list"></span> Eğitim Videoları Listesi</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Kategori Bilgileri</h5>
                            <div className="row">
                                <div className="col-lg-6">

                                    {educationVideoPlaylistFormContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default NewEducationVideoPlaylist