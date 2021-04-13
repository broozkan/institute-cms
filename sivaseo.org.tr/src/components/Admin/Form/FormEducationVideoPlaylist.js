import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import api from '../../../services/api'




class EducationVideoPlaylistForm extends React.Component {

    constructor() {
        super()

        this.state = {
            education_video_playlist_name: "",
            education_video_playlist_url: "",
            is_education_video_playlist_private: true,
            is_submitting: false
        }

        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }



    componentDidMount() {

        if (this.props.education_video_playlist_id) {
            this.getEducationVideoPlaylist()
        }
        this.setState(this.props.states)
    }

    getEducationVideoPlaylist = async () => {
        const eduacationVideoPlaylist = await api.get('/education-video-playlists/1', { params: { '_id': this.props.education_video_playlist_id }, headers: { 'auth-token': localStorage.getItem('auth-token') } })

        this.setState(eduacationVideoPlaylist.data.docs[0])
    }

    // form material on change event
    handleOnChange(e) {
        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked,
            })
        } else if (e.target.type === "file") {
            this.setState({
                education_video_playlist_image: e.target.files[0]
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    // form materials on change event end

    async handleSubmit(e) {
        e.preventDefault()
        this.setState({
            is_submitting: true
        })


        let submitResponse = '';
        if (this.props.education_video_playlist_id) {
            submitResponse = await api.put(process.env.REACT_APP_API_ENDPOINT + '/education-video-playlists/' + this.props.education_video_playlist_id, this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        } else {
            submitResponse = await api.post(process.env.REACT_APP_API_ENDPOINT + '/education-video-playlists', this.state, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        }

        if (submitResponse.data.response) {
            Swal.fire({
                title: 'Başarılı!',
                text: "Ediğim video listesi kaydedildi",
                icon: 'success'
            })
        } else {
            Swal.fire({
                title: 'Hata!',
                text: submitResponse.data.responseData,
                icon: 'error'
            })
        }

    }


    render() {
        // loader queries for submit button
        let btnSaveInnerText = "Kaydet";
        if (this.state.is_submitting == true) {
            btnSaveInnerText = <span className="fa fa-spinner fa-spin"></span>
        }



        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="position-relative row form-group">
                    <label for="education_video_playlist_name" className="col-sm-4 col-form-label">Eğitim Videosu Listesi Adı</label>
                    <div className="col-sm-8">
                        <input name="education_video_playlist_name" id="education_video_playlist_name" value={this.state.education_video_playlist_name} onChange={this.handleOnChange} required placeholder="Eğitim videosu listesi adı giriniz" type="text" className="form-control" />
                    </div>
                </div>
                <div className="position-relative row form-group">
                    <label for="education_video_playlist_url" className="col-sm-4 col-form-label">Eğitim Videosu Listesi Url</label>
                    <div className="col-sm-8">
                        <input name="education_video_playlist_url" id="education_video_playlist_url" value={this.state.education_video_playlist_url} onChange={this.handleOnChange} required placeholder="Eğitim videosu listesi youtube linki giriniz" type="text" className="form-control" />
                    </div>
                </div>


                <div className="position-relative form-check">
                    <input name="is_education_video_playlist_private" id="is_education_video_playlist_private" type="checkbox" checked={this.state.is_education_video_playlist_private} onChange={this.handleOnChange} className="form-check-input" />
                    <label for="is_education_video_playlist_private" className="form-check-label">İçerik Gizli Olsun</label>
                </div>


                <div className="position-relative form-group float-right">
                    <Link to={adminUrls.EDUCATION_VIDEO_PLAYLIST_LIST_VIEW} className="btn btn-default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default EducationVideoPlaylistForm