import React from 'react'
import { Link } from 'react-router-dom'




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
        this.setState(this.props.states)        
    }

    

    // form material on change event
    handleOnChange(e) {
        if (e.target.type === "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked,
            })
        }else if(e.target.type === "file"){
            this.setState({
                education_video_playlist_image: e.target.files[0]
            })
        }else {
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
        
        await this.props.formSubmitFunction(this.state)
        this.setState({
            is_submitting: false
        })
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
                    <Link to="/education-video-playlist/list" className="btn btn-default">Geri Dön</Link>
                    <button className="btn btn-primary" onClick={this.btnSaveHandle} type="submit"> {btnSaveInnerText} </button>
                </div>


            </form>
        )
    }

}

export default EducationVideoPlaylistForm