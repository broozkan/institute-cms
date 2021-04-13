import React from 'react'
import axios from 'axios'
import getEducationVideoList from '../../data/EducationVideoPlaylistData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableContentSpinner from '../Common/CommonSpinner'

class EducationVideoList extends React.Component {

    constructor() {
        super()

        this.state = {
            education_videos: [],
            is_education_videos_loaded: false
        }

        this.deleteClick = this.deleteClick.bind(this)
    }


    deleteClick(educationVideoId) {

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen video geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, eminim!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(process.env.REACT_APP_API_ENDPOINT+'/education-video-playlist/delete/' + educationVideoId)
                    .then(res => {
                        
                        if (res.data.response == true) {
                            Swal.fire({
                                title: 'Başarılı!',
                                text: 'Eğitim Videosu silindi',
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
        await getEducationVideoList("", (data) => {
            this.setState({
                education_videos: data,
                is_education_videos_loaded: true
            })
        })

    }


    render() {
        let tableContent = "";
        if (this.state.is_education_videos_loaded == false) {
            tableContent = <TableContentSpinner />
        } else {
            tableContent = this.state.education_videos.map((item) => {
                return (
                    <tr>
                        <td><a target="_blank" href={item.education_video_playlist_url}>{item.education_video_playlist_name}</a></td>
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
                                        Eğitim Videoları
                                                <div className="page-title-subheading">
                                            Sistem kullanıcılarına sunulan eğitim videoları
                                                </div>
                                    </div>
                                    <div className="col-lg-12 mt-2">
                                        <Link to="/education-video-playlist/new" className="btn btn-success"> <span className="fa fa-plus"></span> Yeni Eğitim Videosu Ekle</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="main-card mb-3 card">
                        <div class="card-body"><h5 class="card-title">Eğitim Videosuler</h5>
                            <table className="table table-striped">
                                <thead>
                                    <th>Eğitim Videosu Url</th>
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

export default EducationVideoList