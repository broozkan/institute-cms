import React, { useState } from 'react'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'
import { useEffect } from 'react'
import api from '../../../../services/api'
import CommonSpinner from '../../../../components/Site/Spinner/CommonSpinner'
import IframeEducationVideoPlaylist from '../../../../components/Site/Iframe/IframeEducationVideoPlaylist'

const EducateVideoPlaylistDetail = (props) => {

    const [state, setState] = useState({
        education_video_playlist: {},
        is_education_video_playlist_loaded: false
    })


    useEffect(() => {
        getEducationVideoPlaylist()
    }, [])



    const getEducationVideoPlaylist = async () => {
        const educationVideoPlaylist = await api.get('/education-video-playlists/1', { headers: { 'auth-token': localStorage.getItem('dashboard-auth-token') }, params: { '_id': props.match.params.educationVideoPlaylistId } })

        setState({
            ...state,
            education_video_playlist: educationVideoPlaylist.data.docs[0],
            is_education_video_playlist_loaded: true
        })

    }

    console.log(state);
    let educationVideoPlaylistHtml = ''
    if (!state.is_education_video_playlist_loaded) {
        educationVideoPlaylistHtml = <CommonSpinner />
    } else {
        educationVideoPlaylistHtml = <IframeEducationVideoPlaylist education_video_playlist={state.education_video_playlist} />

    }

    return (
        <>
            <PageTitle title={["Kullanıcı İşlemleri", "Eğitim Videoları", state.education_video_playlist.education_video_playlist_name]} />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="section-title">
                            <LinkReturnDashboard />
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-body ptb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 offset-lg-2 offset-md-2">
                            <div className="row">
                                <div className="col-lg-12">
                                    {educationVideoPlaylistHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


export default EducateVideoPlaylistDetail