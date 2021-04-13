import React, { useEffect, useState } from 'react'
import { adminUrls } from '../../../lib/Admin/adminUrls'
import api from '../../../services/api'
import ButtonDelete from '../Button/ButtonDelete'
import LinkUpdate from '../Link/LinkUpdate'
import Pagination from '../Pagination/Pagination'
import CommonSpinner from '../Spinner/CommonSpinner'


const TableEducationVideoPlaylist = () => {

    const [state, setState] = useState({
        education_video_playlists: [],
        pagination_info: '',
        is_education_video_playlists_loaded: false,

    })


    useEffect(() => {
        getCategories()
    }, [])


    const getCategories = async (page = 1) => {
        setState({
            ...state,
            is_education_video_playlists_loaded: false
        })

        const education_video_playlists = await api.get('/education-video-playlists/' + page, { headers: { 'auth-token': localStorage.getItem('auth-token') } })

        setState({
            ...state,
            education_video_playlists: education_video_playlists.data.docs,
            pagination_info: education_video_playlists.data,
            is_education_video_playlists_loaded: true
        })
    }



    let tableEducationVideTableEducationVideoPlaylistHtml = ''
    if (!state.is_education_video_playlists_loaded) {
        tableEducationVideTableEducationVideoPlaylistHtml = <CommonSpinner />
    } else {
        const user = JSON.parse(localStorage.getItem('user'))

        // render table content
        tableEducationVideTableEducationVideoPlaylistHtml = state.education_video_playlists.map((item) => {


            return (
                <tr>
                    <td>{item.education_video_playlist_name}</td>
                    <td>
                        <a href={`${adminUrls.UPDATE_EDUCATION_VIDEO_PLAYLIST_VIEW}/${item._id}`}> <span className="fa fa-edit"></span> Düzenle</a>
                        <ButtonDelete model_name="education_video_playlists" _id={item._id} />
                    </td>
                </tr>
            )
        })



    }


    return (
        <>
            <table className="table table-striped table-bordered">
                <thead>
                    <th>Kategori</th>
                    <th>#</th>
                </thead>
                <tbody>
                    {tableEducationVideTableEducationVideoPlaylistHtml}
                </tbody>
            </table>
            <Pagination object={state.pagination_info} onClick={getCategories} />

        </>
    )

}


export default TableEducationVideoPlaylist