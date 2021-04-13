import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import api from '../../../services/api'

const ButtonDelete = (props) => {

  const [state, setState] = useState({
    model_name: '',
    model_id: ''
  })


  useEffect(() => {
    setState({
      model_name: props.model_name,
      model_id: props._id
    })
  }, [])


  const handleClick = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: 'Emin misiniz?',
      text: "Silinen kayıt geri alınamaz!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const submitResponse = await api.delete(process.env.REACT_APP_API_ENDPOINT + '/' + state.model_name + '/' + state.model_id, { headers: { 'auth-token': localStorage.getItem('auth-token') } })
        if (submitResponse.data.response) {
          Swal.fire({
            title: 'Başarılı',
            text: 'Kayıt silindi',
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
    })

  }

  return (
    <a href="" onClick={handleClick} className="text-danger ml-2"> <span className="fa fa-trash"></span> Sil</a>
  )

}

export default ButtonDelete