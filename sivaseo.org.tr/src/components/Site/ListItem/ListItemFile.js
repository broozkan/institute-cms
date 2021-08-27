import React, { useState } from 'react'
import api from '../../../services/api'
import Swal from 'sweetalert2'
import CommonSpinner from '../Spinner/CommonSpinner'

const ListItemFile = (props) => {

    const [state, setState] = useState({
        is_file_ready_to_download: false,
        is_file_preparing: false
    })

    const handleClick = async (e) => {
        setState({
            ...state,
            is_file_preparing: true
        })
        const submitResponse = await api.get('/pdf/generate/' + e.currentTarget.dataset.file_id, { headers: { 'auth-token': localStorage.getItem('dashboard-auth-token') } })

        console.log(submitResponse);
        if (submitResponse.data.response == true) {
            const file = api.get('/pdf/download/' + submitResponse.data.file_name, { headers: { 'auth-token': localStorage.getItem('dashboard-auth-token') } })
            setState({
                is_file_ready_to_download: true,
                is_file_preparing: false
            })
        } else {
            Swal.fire({
                title: 'Hata!',
                text: submitResponse.responseData,
                icon: 'error'
            })
        }

    }

    let fileDownloadLink = ''

    if (state.is_file_ready_to_download) {
        const user = JSON.parse(localStorage.getItem('user'))
        fileDownloadLink = <a href={process.env.REACT_APP_API_ENDPOINT + '/pdf/download/' + user._id} download={process.env.REACT_APP_API_ENDPOINT + '/pdf/download/' + user._id}>Belgeniz hazır indirmek için tıklayınız...</a>
    } else if (state.is_file_preparing) {
        fileDownloadLink = <CommonSpinner />
    } else {
        fileDownloadLink = <a href="#" data-file_id={props.item.file_id} onClick={handleClick}>{props.item.name} <span className="fa fa-download float-right  mt-1"></span> </a>
    }

    return (
        <li>
            {fileDownloadLink}
        </li>
    )
}

export default ListItemFile