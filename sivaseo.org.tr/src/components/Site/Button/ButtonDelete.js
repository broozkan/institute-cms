import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const ButtonDelete = (props) => {

    const [state, setState] = useState({
        model_name:'',
        model_id:''
    })


    useEffect(()=>{
        setState({
            model_name: props.model_name,
            model_id: props._id
        })
    },[])

    const handleClick = async (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Emin misiniz?',
            text: "Silinen miadı yakın ilaç geri alınamaz!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, sil!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })

    }

    return(
        <a href="" onClick={handleClick} className="text-danger ml-2"> <span className="fa fa-trash"></span> Sil</a>
    )

}

export default ButtonDelete