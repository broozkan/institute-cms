import React, { useState } from 'react'
import { SiteContextWrapper } from '../../../../contexts/Site/SiteContext'
import PageTitle from '../../../../components/Site/PageTitle/PageTitle'
import LinkReturnDashboard from '../../../../components/Site/Link/LinkReturnDashboard'
import CardEducationVideoPlaylist from '../../../../components/Site/Card/CardEducationVideoPlaylist'
import { useEffect } from 'react'
import api from '../../../../services/api'
import CommonSpinner from '../../../../components/Site/Spinner/CommonSpinner'
import ListFile from '../../../../components/Site/List/ListFile'

const EducateVideoPlaylistList = () => {

    const [state, setState] = useState({
        education_video_playlists: [],
        is_education_video_playlist_loaded: false
    })    


    useEffect(()=>{
        getEducationVideoPlaylists()
    },[])


    const getEducationVideoPlaylists = async () => {
        const educationVideoPlaylists = await api.get('/education-video-playlist/list',{ headers:{'auth-token':localStorage.getItem('dashboard-auth-token')}})

        setState({
            ...state,
            education_video_playlists: educationVideoPlaylists.data,
            is_education_video_playlist_loaded: true
        })
    }


    let educationVideoPlaylistsHtml = ''
    if(!state.is_education_video_playlist_loaded){
        educationVideoPlaylistsHtml = <CommonSpinner />
    }else{
        educationVideoPlaylistsHtml = state.education_video_playlists.map((item) => {
            return(
                <div className="col-md-6">
                    <CardEducationVideoPlaylist education_video_playlist={item} />
                </div>
            )
        })
    }
    


    return (
        <>
                <PageTitle title={["Kullanıcı İşlemleri", "Belge-Döküman"]} />
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
                                    <ListFile />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )

}


export default EducateVideoPlaylistList